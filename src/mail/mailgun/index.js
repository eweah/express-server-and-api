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

const path = require('path');
const fsPromises = require('fs').promises;

 const formData = require('form-data');
 const Mailgun = require('mailgun.js');
 const mailgun = new Mailgun(formData);

 require("../../config/Env");

 const Registration = require('../templates/registration');
 const Activation = require('../templates/actions/account/activate');
 const Alert = require('../templates/alert');
 const Newsletter = require('../templates/newsletter');
 const Password = require('../templates/password');

class Mail extends require("../../Base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Mail);
    // auto invoke methods
    this.autoinvoker(Mail);
    // add other classes methods if methods do not already exists. Argument order matters!
    this.methodizer(Registration,Activation,Alert,Newsletter,Password);
    //Set maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  init(){
    this.client = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
    this.DOMAIN = process.env.MAILGUN_DOMAIN
    
    if(!this.from) this.from = 'Ericson Weah <ericson.weah@ericsonweah.dev>';
    if(!this.to) this.to = 'ericson.weah@gmail.com';
    if(!this.subject) this.subject = 'Production Grade Express API. This is super cool!';
    if(!this.message) this.message = 'Just a text';
    if(!this.html) this.html =  '<html>HTML version of the body</html>';
    if(!this.attachment) this.attachment = [];
    if(!this.cc) this.cc = 'baz@example.com';
    if(!this.bcc) this.bcc = 'bar@example.com';
    if(!this.filenames) this.filenames = [];
  }

  async send(){
      try{
        const result = await this.client.messages.create(this.DOMAIN, {
            from: this.from, 
            to: this.to, 
            subject: this.subject,
            text: this.message
        })
        this.emit('send',result)
        return res
      }catch(error){
        this.emit('send-error', error)
        return error
      }finally{
        return this
      }
  }
  async attachmentList(){
    if(this.filenames && this.filenames.length > 0){
        for (let filename of this.filenames){
            let filepath = path.join(__dirname, filename);
            let file = {
                filename: filename,
                data: await fsPromises.readFile(filepath)
              };
           this.attachment.push(file)
           return this.attachment
        }

       }
  }
 
  async sendMail(success = 'sendHTMLWithText', err = 'sendHTMLWithText-error', mailHtml = this.html){
    try {
      await this.attachmentList()
      const data = {
        from: this.from,
        to: this.to,
        cc: this.cc,
        bcc: this.bcc,
        subject: this.subject,
        text: this.message,
        html: mailHtml,
        attachment: this.attachment
      };
  
      const result = await this.client.messages.create(this.DOMAIN, data);
      console.log('Email Sent!');
      this.emit(success, result)

      return result
    } catch (error) {
      this.emit(err, error)
    }finally{
        this.attachment = []
        return this
    }
}

  async sendHTMLWithText(){
    await this.sendMail('sendHTMLWithText', 'sendHTMLWithText-error');
  }
  async sendActivationMail(data = {}){
      await this.sendMail('sendActivationMail', 'sendActivationMail-error',this.activation(data));
      // return this;
  }
  async sendRegistrationMail(data = {}){
    await this.sendMail('sendRegistrationMail', 'sendRegistrationMail-error',this.registration(data));
    // return this;
  }

  async sendNewsletter(data = {}){
    await this.sendMail('sendNewsletter', 'sendNewsletter-error',this.newsletter(data));
    // return this;
  }

  async sendAlert(data = {}){
    await this.sendMail('sendAlert', 'sendAlert-error',this.alert(data));
    // return this;
  }

  async sendPasswordResetMail(data = {}){
      await this.sendMail('sendPasswordResetMail', 'sendPasswordResetMail-error',this.password(data));
      // return this;
  }

  async sendWithMIMELibrary(){}


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
      return ["init"];
    }
}
module.exports = Mail;

// const mail = new Mail; 
// mail.sendActivationMail();
// // mail.sendPasswordResetMail();
// // mail.sendRegistrationMail();









