"use strict";

/**
* @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.801.671.7159>
 *
 * @module Mail
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Mail class
 */
 const formData = require('form-data');
 const Mailgun = require('mailgun.js');
 const mailgun = new Mailgun(formData);

 require("../../src/config/Env");
class Mail extends require("../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
    this.mailgunClient = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

    // auto bind methods
    this.autobind(Mail);
    // auto invoke methods
    this.autoinvoker(Mail);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */)
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  
}

module.exports = Mail;
