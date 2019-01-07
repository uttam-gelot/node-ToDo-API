const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

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

var Users = mongoose.model("Users",UserSchema);
module.exports = {Users};