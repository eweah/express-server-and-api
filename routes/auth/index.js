"use strict";
const Route = require('express')();

const AuthController = require("../../app/controllers/http/auth");

const {login, logout, register} = new AuthController();


/*
|--------------------------------------------------------------------------
| HTTP Web Routes: User Routes
|--------------------------------------------------------------------------
|
|
*/

Route.get('/register', register)
Route.post('/login', login)
Route.post('/logout', logout)
module.exports = Route;
