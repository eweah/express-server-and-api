"use strict";

/**
* @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.801.671.7159>
 *
 * @module HTTPController
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc HTTPController class
 */

class HTTPController extends require("../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(HTTPController);
    // auto invoke methods
    this.autoinvoker(HTTPController);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */);
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
}

module.exports = HTTPController;
