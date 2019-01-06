const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/ToDoApp", {useNewUrlParser: true}, (error, client) =>
{
    if (error) 
    {
        return console.log("unable to connect to mongodb server...");
    }
    console.log("connected to mongodb server...");

    const db = client.db("ToDoApp");

    db.collection("Users").find(
    {
        name : "vedant"
    }).toArray().then((result) =>
    {
        console.log("Users..");
        console.log(JSON.stringify(result, undefined, 4));
    }, (error) =>
    {
        console.log(`unable to fatch user(s) ${error}`);
    });

    // db.collection("ToDos").find().count().then((count) => 
    // {
    //         console.log(`ToDos count...: ${count}`);
    // }, (error) => 
    // {
    //     console.log("Unable to fetch ToDos..", error);

    // });

    // db.collection("ToDos").find(
    // {
    //         _id: new ObjectID("5c31d5c6c8aa456116777477")

    // }).toArray().then((docs) =>
    // {
    //     console.log("ToDos...");
    //     console.log(JSON.stringify(docs, undefined, 4));
    // },(error) =>
    // {
    //     console.log("Unable to fetch ToDos..", error);
        
    // });

    client.close();
});