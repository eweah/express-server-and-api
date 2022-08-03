"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Newsletter
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Newsletter class
 */

const newsletterTemplate = require('./template');
class Newsletter extends require("../../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
   
    // auto bind methods
    this.autobind(Newsletter);
    // auto invoke methods
    this.autoinvoker(Newsletter);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */)
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
  static Newsletter(data = {}) {
    return newsletterTemplate(data);
  }
  newsletter(data = {}){
    return newsletterTemplate(data);
  }

}

module.exports = Newsletter;
