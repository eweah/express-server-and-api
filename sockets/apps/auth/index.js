"use strict";

const AuthController = require("../../../app/controllers/tcp/users/AuthController");

const { register, login, logout, status } = new AuthController();

const Redis = require("ioredis");

/*
|--------------------------------------------------------------------------
| TCP Routes: Auth Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io) => {
  const AuthNamespace = io.of("/auth");

  const sub = new Redis();
  const pub = new Redis();

  const onAuthConnection = (socket) => {
    register(io, socket, sub, pub);
    login(io, socket, sub, pub);
    logout(io, socket, sub, pub);
    status(io, socket, sub, pub);
  };
  AuthNamespace.on("connection", onAuthConnection);
};
