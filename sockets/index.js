"use strict";
const socketIo = require("../src/sockets/socketio");
const AppsNamespace = require("./apps");

/*
|--------------------------------------------------------------------------
| TCP Routes
|--------------------------------------------------------------------------
|
| Here is where you can register your TCP routes for your application.
|
| Important:  there is no need to import web routes  from anywhere else within
| the application because they are automatically  mounted to the main app.
| 
|
*/
module.exports = (server) => {
  AppsNamespace(socketIo(server));
};
