"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module User
 * @kind class
 *
 * @extends Mongo
 * @requires Mongo
 *
 * @classdesc User  class
 */

const Hash = require('../../src/utils/Hash')
require("../../src/config/Env");
class User extends require("../../src/models/nosql/mongo") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    this.collection = 'users';
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(User);
    // auto invoke methods
    this.autoinvoker(User);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(/** */);
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

   prepare(data = {}) {
    const d = new Date();
    d.setHours(d.getHours() + 48);
    data.verificationToken = Hash.VerificationToken(`${data.username} ${data.email} ${data.password}`)
    data.password = Hash.Password(data.password)
    data.is_admin = false;
    data.is_super = false;
    data.is_active = false;
    data.activationLink = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/account/activate/${data.verificationToken}`;
    data.verificationTokenExpires = Date.now() + (60 * 60 * 48);
    return data;
   }

   password(password = 'string'){
    return Hash.Password(password)
   }

}

module.exports = User;
