"use strict";

/*
|--------------------------------------------------------------------------
| Socket.io Server, io-redis, and io-redis adapter
|--------------------------------------------------------------------------
|
| Sets the ioredis adapter on the socket.io server and then merge it to the main na
| app.
| 
|
*/

const sio_redis = require("socket.io-redis");
const SocketIo = require("./SocketIo");

module.exports = (server) =>
  new SocketIo(server).adapter(sio_redis({ host: "localhost", port: 6379 }));
