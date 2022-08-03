"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Socket
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Socket class
 */

class Socket extends require("../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Socket);
    // auto invoke methods
    this.autoinvoker(Socket);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */)
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
}

module.exports = Socket;
