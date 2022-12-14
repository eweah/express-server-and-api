"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Alert
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Alert class
 */

const alertTemplate = require('./template');
class Alert extends require("../../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
   
    // auto bind methods
    this.autobind(Alert);
    // auto invoke methods
    this.autoinvoker(Alert);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */)
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  static Alert(data = {}){
    return alertTemplate(data);
  }
  alert(data = {}){
    return alertTemplate(data);
  }
}

module.exports = Alert;
