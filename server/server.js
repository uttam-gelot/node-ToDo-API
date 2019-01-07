const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require("./db/mongoose.js");
const {ToDo} = require("./models/ToDo.js");
const {Users} = require("./models/Users.js");

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

app.get("/todos", (request, response) =>
{

});

app.listen(5555, () =>
{
    console.log("Server is up on port 5555");
});