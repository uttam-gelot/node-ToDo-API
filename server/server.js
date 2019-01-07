const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

const {mongoose} = require("./db/mongoose.js");
const {ToDo} = require("./models/ToDo.js");
const {Users} = require("./models/Users.js");

const port = process.env.PORT || 5555;
const app = express();

app.use(bodyParser.json());

app.post("/todos", (request, response) =>
{
    var todo = new ToDo(
    {
        text: request.body.text
    });
    todo.save().then((result) =>
    {
        response.send(result);
    }, (error) =>
    {
       response.status(400).send(error);
    });
});

app.get("/todos/:id", (request, response) =>
{
    var id = request.params.id;

    if(!ObjectID.isValid(id))
    {
        return response.status(404).send()
    }
    ToDo.findById(id).then((todo) =>
    {
        if(!todo)
           return response.status(404).send();
        response.send({todo});
    }).catch((error) =>
    {
        response.status(404).send();
    });
});

app.get("/todos", (request, response) =>
{
    ToDo.find().then((todos) =>
    {
        response.send({todos});
    }, (error) =>
    {
        response.status(400).send({error});
    });
});

app.listen(port, () =>
{
    console.log(`Server is up on port ${port}`);
});