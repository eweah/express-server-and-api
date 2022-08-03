"use strict";
const ENV = require("../../config/.env")();

/*
|--------------------------------------------------------------------------
| Socket.io Server Class Constructor Options Object
|--------------------------------------------------------------------------
|
| 
|
*/

module.exports = () => ({
  cors: {
    origin: ENV.SOCKETIO_CLIENT_CORS_ORIGIN,
    method: ENV.SOCKETIO_CLIENT_CORS_METHODS,
    allowedHeaders: ENV.SOCKETIO_CLIENT_CORS_ALLOW_HEADERS,
    credentials: ENV.SOCKETIO_CLIENT_CORS_CREDENTIALS,
  },
  maxHttpBufferSize: ENV.SOCKETIO_CLIENT_MAX_HTTP_BUFFER_SIZE,
  pingTimeout: ENV.SOCKETIO_CLIENT_PING_TIME_OUT,
});
