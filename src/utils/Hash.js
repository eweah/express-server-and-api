"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Hash
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Controller class
 */

const bcrypt = require('bcryptjs')
const { createHmac,randomBytes }  = require('crypto')

// const { createHmac } = await import('crypto');

require("../../src/config/Env");

class Hash extends require("../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
   
  }

  static Salt(saltRounds = this.saltRounds || 10){
    return bcrypt.genSaltSync(saltRounds)

  }

  static Password(password = this.password || 'PASSWORD'){
    return  bcrypt.hashSync(password, process.env.HASHING_SALT)
  }
  static Token (randomBytes = this.randomBytes || 20, toString = this.ToString || 'hex'){
    return crypto.randomBytes(randomBytes).toString(toString);
  }

  static VerificationToken (string = 'username email password', randomBytesLength = 64){

   // return process.env;
   return createHmac(process.env.VERIFICATION_TOKEN_METHOD, process.env.VERIFICATION_TOKEN_SECRET)
               .update(string)
               .digest('hex');// + randomBytes(randomBytesLength).toString('hex') ;
  }
 



  static HASH (string = 'PASSWORD_STRING') {
    return  bcrypt.hashSync(string, process.env.HASHING_SALT)

 }
 static Compare(password = 'PASSWORD', hashedPassword = 'HASED-PASSWORD') {
    if(password.length == 0 || hashedPassword.length == 0) return false;
    return bcrypt.compareSync(password, hashedPassword);
 }

 static IsValid(password =  'PASSWORD', hashedPassword =  'HASHED-PASSWORD') {
    if(password.length == 0 || hashedPassword.length == 0) return false;
    return  bcrypt.compareSync(password, hashedPassword);
 }

 async salt(password = this.password || 'PASSWORD', saltRounds = this.saltRounds || 10){
    try{
       const {err, salt} = bcrypt.genSalt(saltRounds)
       if(err) return  this.emit('error', err)

       if(salt){
           try{
              const {err, hash} = await  bcrypt.hash(password, salt)

              if(err) return this.emit('error', err)

              if(hash) {
               this.hash = hash
               this.emit('success', hash)
               return hash
              }
           }catch(error){
               this.emit('error', error)
           }
       }
    }catch(error){
        this.emit('error', error)
    }

 }
 async compare(password = this.password || 'PASSWORD', hash = this.hash || 'USER-PASSWORD-HASH') {
    try{
       const {err, isMatch} = await bcrypt.compare(password, hash)
       if(err) this.emit('invalid', err)
       if(isMatch){
           this.emit('success', isMatch)
           return isMatch
       }
    }catch(error){
       if(err) this.emit('invalid', error)
    }
 }

  
}

module.exports = Hash;

