"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module AuthController
 * @kind class
 *
 * @extends Controller
 * @requires Controller
 *
 * @classdesc AuthController class
 */

class AuthController extends require("../Controller") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
    // autobinds class methods
    this.autobind(AuthController);
    // set maximum listener to infinitiy
    this.setMaxListeners(Infinity);
  }

  /**
   * @name register
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Scoket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middlewares
   *
   * @description get all documents from a collection and or all network objects from a network and  emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */
  async register(io, socket, sub, pub, ...args) {
    sub.subscribe("client:userHasRegistered", (error, count) => {
      if (error) return console.log("error subscribing");
      return console.log(`subscribed to ${count} channels`);
    });
    sub.on(`message`, (channel, message) => {
      const data = JSON.parse(message);
      socket.emit("user-has-registered", data);
    });
  }

  /**
   * @name login
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Scoket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middlewares
   *
   * @description get all documents from a collection and or all network objects from a network and  emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */
  async login(io, socket, sub, pub, ...args) {
    sub.subscribe("client:userHasLoggedIn", (error, count) => {
      if (error) return console.log("error subscribing");
      return console.log(`subscribed to ${count} channels`);
    });

    sub.on(`message`, (channel, message) => {
      const data = JSON.parse(message);
      console.log('IN', data)
      socket.emit("user-has-logged-in", data);
    });
  }

  /**
   * @name logout
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Scoket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middlewares
   *
   * @description get all documents from a collection and or all network objects from a network and  emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */
  async logout(io, socket, sub, pub, ...args) {
    sub.subscribe("client:userHasLoggedOut", (error, count) => {
      if (error) return console.log("error subscribing");
      return console.log(`subscribed to ${count} channels`);
    });
    sub.on(`message`, (channel, message) => {
      const data = JSON.parse(message);
      console.log('OUT', data)
      socket.emit("user-has-logged-out", data);
    });
  }


  /**
   * @name logout
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Scoket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middlewares
   *
   * @description get all documents from a collection and or all network objects from a network and  emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */
 
    async status(io, socket, sub, pub, ...args) {
      sub.subscribe("client:userHasChangedOnlineStatus", (error, count) => {
        if (error) return console.log("error subscribing");
        return console.log(`subscribed to ${count} channels`);
      });
      sub.on(`message`, (channel, message) => {
        const data = JSON.parse(message);
        // console.log('OUT', data)
        socket.emit("user-has-changed-online-status", data);
      });
    }
  /**
   * @name index
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Scoket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middlewares
   *
   * @description get all documents from a collection and or all network objects from a network and  emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async index(io, socket, sub, pub, ...args) {}

  /**
   * @name store
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Scoket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middlewares
   *
   * @description store one or more document in a collection or sends one or more network object to one or more networks and emits event related to the data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async store(io, socket, sub, pub, ...args) {
    sub.subscribe("client:user-created", (error, count) => {
      if (error) return console.log("error subscribing");
      return console.log(`subscribed to ${count} channels`);
    });
    sub.on(`message`, (channel, message) => {
      const user = JSON.parse(message);
      socket.emit("user-created", user);
    });
  }

  /**
   * @name show
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Scoket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middlewares
   *
   * @description gets a document from a collection or a network object from a network and emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async show(io, socket, sub, pub, ...args) {}

  /**
   * @name edit
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Scoket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middlewares
   *
   * @description edits a document from a collection or a network object from a network and emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async edit(io, socket, sub, pub, ...args) {}

  /**
   * @name update
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Scoket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middlewares
   *
   * @description updates a document a collection or a network object from a network and emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async update(io, socket, sub, pub, ...args) {
    sub.subscribe("client:user-updated", (error, count) => {
      if (error) return console.log("error subscribing");
      return console.log(`subscribed to ${count} channels`);
    });
    sub.on(`message`, (channel, message) => {
      const user = JSON.parse(message);
      socket.emit("user-updated", user);
    });
  }

  /**
   * @name destroy
   * @function
   *
   * @param {Object|Function|EventEmitter|Stream} io is the fundamental Socket.io Server class instance for emitting event data, broadcasting, etc ...
   * @param {Object|Function|EventEmitter|Stream} socket socket is the fundamental Scoket.io Server Socket class instance for interacting with browser clients
   * @param {Object|Function|EventEmitter|Stream} sub an instance of Redis (io-redis) for subscription
   * @param {Object|Function|EventEmitter|Stream} pub an instance of Redis (io-redis) for publishing
   * @param {Array} args an optional array of middlewares
   *
   * @description deletes or removes a document a collection or a network object from a network and emits event related to that data
   *
   * @return {EventEmitter}  emits an event or collections of events
   *
   */

  async destroy(io, socket, sub, pub, ...args) {
    sub.subscribe("client:user-deleted", (error, count) => {
      if (error) return console.log("error subscribing");
      return console.log(`subscribed to ${count} channels`);
    });
    sub.on(`message`, (channel, message) => {
      const user = JSON.parse(message);
      socket.emit("user-deleted", user);
    });
  }
}

module.exports = AuthController;
