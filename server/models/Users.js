const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema(
{
    email:
    {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate:
        {
            validator: (value) =>      //validator.isEmail
            {
                return validator.isEmail(value);
            },
            message: `{VALUE} is not valid e-mail`
        }
    },
    password:
    {
        type: String,
        required: true,
        minlength: 6
    },
    tokens:
    [{
        token:
        {
            type: String,
            required: true
        },
        access:
        {
            type: String,
            required: true
        }
    }]
});

UserSchema.pre("save", function (next) 
{
    var user = this;
    if(user.isModified("password"))
    {
        bycrypt.genSalt(10, (error, salt) =>
        {
            bycrypt.hash(user.password, salt, (error, hash) =>
            {
                user.password = hash;
                next();
            });
        });
    }
    else
        next();
});

UserSchema.methods.toJSON = function () 
{
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () 
{
    var user = this;
    var access = "auth";
    var token = jwt.sign({_id : user._id.toHexString(), access}, 'abc123').toString();
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() =>
    {
        return token;
    });
};

UserSchema.statics.findByToken = function (token) 
{
    var User = this;
    var decoded;
    try 
    {
        decoded = jwt.verify(token, "abc123");
    } 
    catch (error) 
    {
        return Promise.reject();
    }
    return User.findOne(
    {
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : "auth"
    });
};

UserSchema.statics.findByCredentials = function (email, password)
{
    var Users = this;
    return Users.findOne({ email}).then((user) =>
    {
        if (!user)
            return Promise.reject({error :"user not found.."});
        return new Promise((resolve, reject) =>
        {
            bcrypt.compare(password, user.password, (error, result) =>
            {
                if(!result)
                    return reject({error : "password doesn't match.."});
                resolve(user);
            });
        });
    }).catch((error) => 
    {
        return Promise.reject(error);
    });
}

var Users = mongoose.model("Users",UserSchema);
module.exports = {Users};