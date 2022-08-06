"use strict";
/*
|--------------------------------------------------------------------------
| TCP Routes
|--------------------------------------------------------------------------
|
| 
*/

module.exports = (io) => {
  // user namespace
  require("./user")(io);
  // auth namespace
  require("./auth")(io);
};
