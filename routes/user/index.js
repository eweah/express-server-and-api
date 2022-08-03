"use strict";
const Route = require("../../src/router")();

const UsersController = require("../../app/controllers/http/users/UsersController");

const { index, show, store, edit, update, destroy, activation } = new UsersController();

const connected = (req, res) => res.status(200).send("connected!");
// const connected = (req, res) => res.render('index.html',{email:'ericson.weah@gmail.com',password:'password'});

// const home = (req, res) => res.render('welcome',{email:'ericson.weah@gmail.com',password:'password'});

/*
|--------------------------------------------------------------------------
| HTTP Web Routes: User Routes
|--------------------------------------------------------------------------
|
|
*/

Route.get("/", (req, res) => {
    res.send('It works!');
});
Route.get("/users", index);
Route.post("/users", store);
Route.get("/users/:id", show);
// Route.post('/users/:id', edit)
Route.put("/users/:id", update);
Route.delete("/users/:id", destroy);
Route.get(`/account/activate/:token`, activation)

module.exports = Route;
