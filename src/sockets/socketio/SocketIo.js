"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module SocketIo
 * @kind class
 *
 * @extends Server (Socket.io Server)
 * @requires Server (Socket.io Server)
 *
 * @classdesc SocketIo class
 */

class SocketIo extends require("socket.io").Server {
  constructor(
    server = {},
    options = {},
    serverOptions = require("./options")()
  ) {
    super(server, serverOptions);

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
    // auto bind methods
    this.autobind(SocketIo);
    // auto invoke methods
    this.autoinvoker(SocketIo);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */);
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  /**
     * @name getFromIterable
     * @function
     *
     * @param {Object|Array} iterable iterable data to absorb
     * @param {Object} options Options provided to new stream.Readable([options]). By default, Readable.from() will set options.objectMode to true, unless this is explicitly opted out by setting options.objectMode to false.
     * 
     * @description creates readable streams out of iterators.


     * 
     * @return {Base}
     * 
     */

  getFromIterable(
    iterable = {} | [],
    options = { objectMode: true, encoding: "utf-8", autoDestroy: true }
  ) {
    return SocketIo.from(JSON.stringify(iterable), options);
  }

  /**
   * @name autobinder
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets and auto binds every and all methods for the corresponding class (except the constructor)
   *
   * @return does not return anything
   *
   */

  autobinder(className = {}) {
    for (let method of Object.getOwnPropertyNames(className.prototype)) {
      if (typeof this[method] === "function" && method !== "constructor") {
        this[method] = this[method].bind(this);
      }
    }
  }

  /**
   * @name autobind
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto mounts and auto binds every and all methods for the corresponding class including
   *  itself(itself mounts and self binds)
   *
   * @return does not return anything
   *
   */

  autobind(className = {}) {
    this.autobinder = this.autobinder.bind(this);
    this.autobinder(className);
  }

  /**
   * @name methodizer
   * @function
   *
   * @param {Object|Array} classNameList the class whose methods to be bound to it
   *
   * @description get methods from all classes with in-class name list array and makes its own
   *
   * @return does not return anything
   *
   */

  methodizer(...classNamesList) {
    if (classNamesList.length === 0) return;
    for (let className of classNamesList) {
      for (let method of Object.getOwnPropertyNames(className.prototype)) {
        if (this[method] === undefined || !this[method]) {
          if (typeof className.prototype[method] === "function") {
            this[method] = className.prototype[method];
          }
        }
      }
    }
  }

  /**
   * @name autoinvoker
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets and auto invokes every and all methods for the corresponding class
   *
   * @return does not return anything
   *
   */

  autoinvoker(className = {}) {
    for (let method of Object.getOwnPropertyNames(className.prototype)) {
      this.autoinvoked().forEach((name) => {
        if (method === name) {
          this[method]();
        }
      });
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
    return [
      /*list of method name to autoinvoke'*/
    ];
  }
}

module.exports = SocketIo;
