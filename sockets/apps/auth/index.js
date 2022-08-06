"use strict";


const Redis = require("ioredis");

const AuthController = require("../../../app/controllers/tcp/users/AuthController");

const { register, login, logout, status } = new AuthController();



/*
|--------------------------------------------------------------------------
| TCP Routes: Auth Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io) => {

  // auth namespace
  const AuthNamespace = io.of("/auth");

  // subscription
  const sub = new Redis();

  // publishing
  const pub = new Redis();

  const onAuthConnection = (socket) => {
    register(io, socket, sub, pub);
    login(io, socket, sub, pub);
    logout(io, socket, sub, pub);
    status(io, socket, sub, pub);
  };
  AuthNamespace.on("connection", onAuthConnection);
};
