const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {ToDo} = require("./../server/models/ToDo");
const {Users} = require("./../server/models/Users");


//remove all
ToDo.remove({}).then((result) =>
{
    console.log(result);
});

//remove one and get data back
//findOneAndRemove
//findByIdAndRemove

ToDo.findOneAndRemove({}).then((todo) =>
{
    console.log(todo);
});