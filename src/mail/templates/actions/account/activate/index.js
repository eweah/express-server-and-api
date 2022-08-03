"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Activate
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Activate class
 */

// require("../../src/config/Env");
const activationTemplate =  require('./template');

class Activate extends require("../../../../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
   
    // auto bind methods
    this.autobind(Activate);
    // auto invoke methods
    this.autoinvoker(Activate);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */)
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
  static Activation(data = {}) {
     return activationTemplate(data);
  }
  activation(data = {}){
    return activationTemplate(data);
  }
}

module.exports = Activate;
