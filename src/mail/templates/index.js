"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Template
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Template class
 */

// require("../../src/config/Env");
const Activate = require('./actions/account/activate');
const Alert = require('./alert');
const Password = require('./password');
const Newsletter = require('./newsletter');
const Registration = require('./registration');

class Template extends require("../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
   
    // auto bind methods
    this.autobind(Template);
    // auto invoke methods
    this.autoinvoker(Template);
    // add other classes method if methods do not already exists. Argument order matters!
    this.methodizer(Registration, Newsletter,Password, Activate,Alert);
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
}

module.exports = Template;
