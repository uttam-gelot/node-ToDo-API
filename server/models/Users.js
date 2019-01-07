 const mongoose = require("mongoose");

var Users = mongoose.model("Users",
{
    email:
    {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});
module.exports = {Users};

//example

// var user = new users(
// {
//     email: " u "
// });

// user.save().then((doc) => 
// {
//     console.log(doc);
// }, (error) =>
// {
//     console.log("Unable to save..:", error);

// });