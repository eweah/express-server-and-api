"use strict";

// const { Router } = require("express");
// const { route } = require("./user");

/*
|--------------------------------------------------------------------------
|  HTTP Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. 
|
| Important:  there is no need to import web routes  from anywhere else within
| the application because they are automatically  mounted to the main app.
| 
|
*/
const router = require("express")();

router.use(require("./user"));
router.use(require('./auth'))

module.exports = router;
