"use strict";




/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module UsersController
 * @kind class
 *
 * @extends Controller
 * @requires Controller
 * @requires User
 *
 * @classdesc UsersController class
 */

const User = require("../../../models/User");

class UsersController extends require("../Controller") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(UsersController);
    // auto invoke methods
    this.autoinvoker(UsersController);
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

  async index(req, res, next, user = new User) {
    
    user.all({});
    user.once("all", (users) => res.status(200).send(users) );
    user.once("all-error", (error) => res.status(200).send(error));
    
  }


  async verificationTokenAndUpdate(req, res, user = new User, result){
    if(new Date(result.verificationTokenExpires) < Date.now()){
      const data = user.prepare(req.body);
      for(let obj in data){
        if(result.hasOwnProperty(obj)) {
           if(result[obj] !== data[obj]){
            result[obj] = data[obj]
           }
        }
      }

      // return res.status(200).send({data, result, inputs: req.body})

       user.updateOne({email: req.params.email}, result)
       user.once('updateOne', updated => res.status(200).send(updated))
       user.once('updateOne-error', error => res.status(200).send(error))
     }else{
       return res.status(200).send({error:'Inactive Account Found. Please Activate your account by finding the activation link we emailed you!'});
     }
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
  async store(req, res, next, user = new User) {
    

    user.firstByEmail(req.body.email)
    
    user.once('firstByEmail', result => {
        
      if(result.email && result.username && (!result.verificationToken || !result.activationLink)){
        return res.status(200).send({error:'An active account with this email or username already exists!'});
      }

      if(Object.keys(result).length == 0){
        const data = user.prepare(req.body)
        user.create(data)
        user.once('create', result => this.findModelById(req, res, next, result.insertedId, user))
        user.once('create-error', error => res.status(200).send(error))
        return ;
      }

      if(Object.keys(result).length != 0 && result.verificationToken && result.activationLink){
          this.verificationTokenAndUpdate(req, res, user, result);
      }else{
        return res.status(200).send({error:'Account has already been activated. Please Login!'});
      }
      // res.status(200).send(result)
    })
    user.once('firstByEmail-error', error => res.status(200).send(error))

  }

  /**
   * @name show
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description finds a user by id (':id') or username (':username') or email (':email') and returns it
   *
   * @return {Object}  user object
   *
   */
  async show(req, res, next, user = new User) {
    user.findById(req.params.id);
    user.once('findById', (user) => res.status(200).send(user));
    user.once('findById-error', (error) => res.status(200).send(error));

  }

  /**
   * @name edit
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description finds a user by id (':id') or username (':username') or email (':email') and returns it to a view (if any) for editing/updating
   *
   * @return {Object}  user object
   *
   */
  async edit(req, res, next, user = new User()) {}

  /**
   * @name update
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description updates a user by id (':id') or username (':username') or email (':email')
   *
   * @return {Object}  user object
   *
   */
  async update(req, res, next, user = new User) {
    
    user.update({id: req.params.id},{data: req.body})
    user.once('update', user => res.status(200).send(user))
    user.once('update-error', error => res.status(200).send(error))
   
  }

  /**
   * @name destroy
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description delete a user by id (':id') or username (':username') or email (':email')
   *
   * @return {Object}  user object
   *
   */
  async destroy(req, res, next, user = new User()) {
    user.deleteOne({id: req.params.id})
    user.once('deleteOne', user => res.status(200).send(user))
    user.once('deleteOne-error', error => res.status(200).send(error))

  }


  /**
   * @name activation
   * @function
   *
   * @param {Object|Stream} req readable stream: NodeJs Native HTTP Server Request Object
   * @param {Object|Stream} res writable stream: NodeJs Native HTTP Server Response Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Stream} user instance of the User Model: An extension of NodeJs Native Transform Stream
   *
   * @description delete a user by id (':id') or username (':username') or email (':email')
   *
   * @return {Object}  user object
   *
   */
   async activation(req, res, next, user = new User()) {

    user.firstByQuery({verificationToken: req.params.token})

    user.once('firstByQuery', foundUser => {
      if(JSON.stringify(foundUser) == '{}') return res.status(200).send({error:'Account activation code no longer exists or is invalid or never existed. Please Register!'});
      if(foundUser && foundUser.verificationToken && foundUser.activationLink){
        if(new Date(foundUser.verificationTokenExpires) < Date.now()){
          return res.status(200).send({error:'Activation link has expired. Please Re-register!'});
         }else{
          foundUser.verificationToken  = '';  
          foundUser.activationLink  = '';  
           user.updateOne({verificationToken: req.params.token}, foundUser)
           const successMessage = {success: 'Your account has been activated! You may now login.'}
           const errorMessage = {error: 'Account activation failed! Please re-register or contact us.'}
           user.once('updateOne', updated => {
            const {modifiedCount, matchedCount} = updated
            if(modifiedCount  == 1 && matchedCount == 1) return res.status(200).send(successMessage)
            return res.status(200).send(errorMessage)
           })
           user.once('updateOne-error', error => res.status(200).send(error))
         }
      }else if(!foundUser || foundUser.verificationToken  || foundUser.activationLink ){
        return res.status(200).send({error:'Account activation code not longer exists or never existed. Please Register!'});
      }else{
        return res.status(200).send({error:'Account has already been activated. Please Login!'});
      }
    })
    user.once('firstByQuery-error', error => res.status(200).send(error))
  }
}

module.exports = UsersController;
