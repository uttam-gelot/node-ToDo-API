const mongoose = require("mongoose");

var ToDo = mongoose.model("ToDo",
    {
        text:
        {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        completed:
        {
            type: Boolean,
            default: false
        },
        completedAt:
        {
            type: Number,
            default: null
        },
        _creator :
        {
            required: true,
            type: mongoose.Schema.Types.ObjectId
        }
    });
module.exports = {ToDo};


//example

// var newToDo = new ToDo(
// {
//     text: " hello ",
// });

// newToDo.save().then((result) =>
// {
//     console.log(result);
// }, (error) =>
// {
//     console.log("Unable to save todo..:", error);
// });