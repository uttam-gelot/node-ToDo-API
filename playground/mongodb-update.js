const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/ToDoApp", { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("unable to connect to mongodb server...");
    }
    console.log("connected to mongodb server...");

    const db = client.db("ToDoApp");

    db.collection("Users").findOneAndUpdate(
    {
        name: "vedant"
    },
    {
        $inc :
        {
            age: 1
        }
    },
    {
        returnOriginal: false
    }).then((result) =>
    {
        console.log(result);
    });

    // db.collection("ToDos").findOneAndUpdate(
    // {
    //     _id: new ObjectID("5c31d5c6c8aa456116777477")
    // },
    // {
    //     $set :
    //     {
    //         completed: true
    //     }
    // },
    // {
    //     returnOriginal: false
    // }).then((result) => 
    // {
    //     console.log(result);
    // });

    client.close();
});