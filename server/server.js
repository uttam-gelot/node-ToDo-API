const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const {mongoose} = require("./db/mongoose.js");
const {ToDo} = require("./models/ToDo.js");
const {Users} = require("./models/Users.js");
const {authenticate} = require("./middleware/authenticate");

const port = process.env.PORT || 5555;
const app = express();

app.use(bodyParser.json());

app.post("/todos", authenticate, (request, response) =>
{
    var todo = new ToDo(
    {
        text: request.body.text,
        _creator: request.user._id
    });
    todo.save().then((result) =>
    {
        response.send(result);
    }, (error) =>
    {
       response.status(400).send(error);
    });
});

app.get("/todos/:id", authenticate, (request, response) =>
{
    var id = request.params.id;

    if(!ObjectID.isValid(id))
    {
        return response.status(404).send()
    }
    ToDo.findOne(
    {
        _id: id,
        _creator :request.user._id
    }).then((todo) =>
    {
        if(!todo)
           return response.status(404).send();
        response.send({todo});
    }).catch((error) =>
    {
        response.status(404).send();
    });
});

app.get("/todos", authenticate, (request, response) =>
{
    ToDo.find(
    {
        _creator: request.user._id
    }).then((todos) =>
    {
        response.send({todos});
    }, (error) =>
    {
        response.status(400).send({error});
    });
});

app.delete("/todos/:id", authenticate, (request, response) =>
{
    var id = request.params.id;
    if(!ObjectID.isValid(id))
        return response.status(400).send();
    ToDo.findOneAndDelete(
    {
        _id: id,
        _creator: request.user._id
    }).then((todo) =>
    {
        if(!todo)
            return response.status(404).send();
        response.send({todo});
    }).catch((error) =>
    {
        response.send(404).send();
    });
});

app.patch("/todos/:id", authenticate, (request, response) =>
{
    var id = request.params.id;
    var body = _.pick(request.body, ['text', 'completed']);

    if (!ObjectID.isValid(id))
        return response.status(400).send();
    if(_.isBoolean(body.completed) && body.completed)
    {
        body.completedAt = new Date().getTime();
    }
    else
    {
        body.completed = false; 
        body.completedAt = null;
    }
    console.log(body);
    ToDo.findOneAndUpdate(
    {
        _id: id,
        _creator: request.user._id
    },
    {
        $set :body
    },
    {
        new : true
    }).then((todo) =>
    {
        if(!todo)
            return response.status(404).send();
        response.send({todo});
    }).catch((error) =>
    {
        response.status(400).send();
    });
});

app.post("/users", (request, response) =>
{
    var userData = _.pick(request.body, ['email', 'password']);
    
    var user = new Users(userData);
    user.save().then((result) =>
    {
        // response.send({result});
        return user.generateAuthToken();
    }).then((token) =>
    {
        response.header("x-auth", token).send(user);
    }).catch((error) =>
    {
        console.log(error);
        response.status(404).send({error});
    });
});

app.get("/users/me", authenticate, (request, response) =>
{
    response.send(request.user);
});

app.get("/users/login", (request, response) =>
{
    var body = _.pick(request.body, ['email', 'password']);
    Users.findByCredentials(body.email, body.password).then((user) =>
    {
        return user.generateAuthToken().then((token) =>
        {
            response.header("x-auth", token).send(user);
        });
    }).catch((error) => 
    {
        response.status(400).send(error);
    });
});

app.delete("/users/me/token", authenticate, (request, response) =>
{
    var user = request.user;
    var token = request.token;
    user.removeToken(token).then(() =>
    {
        response.status(200).send();
    }, () =>
    {
        response.status(400).send();
    });
});
app.listen(port, () =>
{
    console.log(`Server is up on port ${port}`);
});