"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.com> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Env
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 *
 * @classdesc Env class
 */

const env = require("./.env")();

class Env extends require("../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Env);
    // auto invoke methods
    this.autoinvoker(Env);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */);
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  /**
   * @name addvariables
   * @function
   *
   *
   * @description add customed environmental objects to NodeJs global process.env object
   *
   * @return does not return anything
   *
   */
  async addvariables() {
    for (let prop in env) {
      if (!process.env[prop]) {
        if (typeof env[prop] === "string") {
          process.env[prop] = env[prop];
        }
      }
    }
  }

  /**
   * @name autoinvoked
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets the list of methods to be auto invoked
   *
   * @return does not return anything
   *
   */

  autoinvoked() {
    return ["addvariables"];
  }
}

module.exports = new Env();
