const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/ToDoApp", { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("unable to connect to mongodb server...");
    }
    console.log("connected to mongodb server...");

    const db = client.db("ToDoApp");
    
    //deleteMany
    // db.collection("ToDos").deleteMany({text: "call home"}).then((result) =>
    // {
    //     console.log(JSON.stringify(result, undefined, 4));
    // });

    //deletetOne
    // db.collection("ToDos").deleteOne({text: "call home"}).then((result) =>
    // {
    //     console.log(JSON.stringify(result, undefined, 4));
    // });

    // client.close();

    //findOneDelete
    db.collection("ToDos").findOneAndDelete({text: "call home"}).then((result) =>
    {
        console.log(result);
    });
});