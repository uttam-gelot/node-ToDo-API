// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID}= require("mongodb");

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect("mongodb://localhost:27017/ToDoApp", { useNewUrlParser: true }, (error, client) =>
{
    if(error)
    {
       return console.log("unable to connect to mongodb server...");
    }
    console.log("connected to mongodb server...");

    const db = client.db("ToDoApp");
    
    db.collection("Users").insertOne(
    {
        _id : 1137,
        name : "uttam",
        age : 19,
        location : "Ahmedabad, Gujrat, India"
    }, (error, result) =>
    {
        if(error)
            return console.log("unable to insert", error);
        console.log(JSON.stringify(result.ops, undefined, 4));
    });

    // db.collection("ToDos").insertOne(
    // {
    //     text : "something to do",
    //     Completed : false
    // }, (error, result) =>
    // {
    //     if(error)
    //     {
    //         return console.log("unable to insert...", error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    // });

    client.close();
});