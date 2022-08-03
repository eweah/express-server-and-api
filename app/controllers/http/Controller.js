"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Controller
 * @kind class
 *
 * @extends HTTPController (based HTTPController)
 * @requires HTTPController (based HTTPController)
 *
 * @classdesc Controller class
 */


const User  = require('../../models/User')
const Mail = require('../../../src/mail/mailgun')

class Controller extends require("../../../src/controllers/http") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

        // auto bind methods
        this.autobind(Controller );
        // auto invoke methods
        this.autoinvoker(Controller );
        // add other classes method if methods do not already exists. Argument order matters!
        // this.methodizer(Hash);
        //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
  }


  /**
   * @name findUserById
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description stores a user or multiple users to  database
   *
   * @return {Object|Array|List}  users collections/array/object
   *
   */
      async findModelById(req, res, next, insertedId = '', model = new User) {
        model.once('findById', newModel=> {
          const mail = new Mail;
          mail.sendActivationMail(newModel);
          res.status(200).send(newModel)
        })
        model.once('findById-error', (error) => res.status(200).send(error));
        model.findById(insertedId);

      }
}

module.exports = Controller;


