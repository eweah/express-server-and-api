"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.com> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Controller
 * @kind class
 *
 * @extends TCPController (base TCPController)
 * @requires TCPController (base TCPController)
 *
 * @classdesc Controller class
 */

class Controller extends require("../../../src/controllers/tcp") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
  }
}

module.exports = Controller;
