"use strict";

const Redis = require("ioredis");

const UsersController = require("../../../app/controllers/tcp/users/UsersController");

const { index, show, edit, update, store, destroy } = new UsersController();


/*
|--------------------------------------------------------------------------
| TCP Routes: User Namespace
|--------------------------------------------------------------------------
|
|
*/

module.exports = (io) => {
  
  // user namespace
  const UserNamespace = io.of("/users");

  // subscription
  const sub = new Redis();
  // publishing
  const pub = new Redis();

  const onUserConnection = (socket) => {
    index(io, socket, sub, pub);
    store(io, socket, sub, pub);
    show(io, socket, sub, pub);
    edit(io, socket, sub, pub);
    update(io, socket, sub, pub);
    destroy(io, socket, sub, pub);
  };
  UserNamespace.on("connection", onUserConnection);
};
