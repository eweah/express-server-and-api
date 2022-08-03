"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Password
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Password class
 */

const template = require('./template');

class Password extends require("../../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
   
    // auto bind methods
    this.autobind(Password);
    // auto invoke methods
    this.autoinvoker(Password);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */)
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  static Password(data = {}) {
    return template(data);
  }
   password(data = {}) {
    return template(data);
  }
 
}

module.exports = Password;
