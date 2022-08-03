"use strict";




/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module AuthController
 * @kind class
 *
 * @extends Controller
 * @requires Controller
 * @requires User
 *
 * @classdesc AuthController class
 */

const bcrypt = require('bcryptjs')
const Hash = require('../../../../src/utils/Hash')
const User = require("../../../models/User");
class AuthController extends require("../Controller") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(AuthController);
    // auto invoke methods
    this.autoinvoker(AuthController);
    // add other classes method if methods do not already exists. Argument order matters!
    // this.methodizer(Model)
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


    /**
   * @name index
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description gets and return all users from the database
   *
   * @return {Object|Array|List}  users collections/array/object
   *
   */

     async register(req, res, next) {
      return res.render('auth/register');
    }
  
  /**
   * @name index
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description gets and return all users from the database
   *
   * @return {Object|Array|List}  users collections/array/object
   *
   */

  async login(req, res, next, user = new User) {

    user.firstByQuery({email: req.body.email})
    user.once("firstByQuery", (result) => Hash.Compare(req.body.password, result.password)
     ? res.status(200).send({success: 'Logged in!', auth: result}) 
     : res.status(200).send({error: 'Invalid credentials'}) );
    user.once("firstByQuery-error", (error) => res.status(200).send(error));
  }


  /**
   * @name store
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
  async logout(req, res, next, user = new User) {
    return res.status(200).send({result: 'logout'})
    // const data = user.prepare(req.body)

    // user.create(data)
    // user.once('create', result => this.findModelById(req, res, next, result.insertedId, user))
    // user.once('create-error', error => res.status(200).send(error))
   
  }
}

module.exports = AuthController;

