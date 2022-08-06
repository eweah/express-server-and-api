## TCP & HTTP NodeJs Server

<!-- ### [RAW NodeJs: Routing A Right Way](https://github.com/ericsonsweah/raw_nodejs_routing_a_right_way "Server, API, Routing") -->

A good TCP, Reatime Communication, and HTTP Server. This is a multipurpose server. It can serve one or more more clients. A client can be a web browser, a frontend application or entity such as reactJs app, VueJs app, or a plain old HTML/CSS/Javascript app. A client is not only limited to frontend entities (or apps). A client can also be a backend server such as laravel application, django Application, another NodeJs server application, etc. 

This may be the basic for a starting point to build a medium to large NodeJs TCP and HTTP server (or API).

### Specifications

The project uses ```ExpressJs``` for HTTP Web routes, ```Socket.io``` for TCP routes and real time communication, ```MongoDb (not mongoose)``` for database, and ```Redis and (redis-adapter)``` for caching, in-memory data storage, and for message broker.

### Design Pattern

MVC: Model-View-Controller Design patterns with a mixture of Object-Oriented Programming the ES6 way and Functional Programming the ES6 way. Views are entirely optional and can be used (or added) when needed.

*** It is flexible: You just use the templates for models, controllers, and routes to add models, controllers, and routes.

### Notes

This project uses Object Oriented Programming (OOP) heavily. It also uses some Functional Programming (FP). By Object Oriented Programming I mean Object Oriented Programming the Javascript way, specifically the ES6 way. And by Functional Programming I mean functional programming the Javascript way, specifically the ES6 way. It also uses NodeJs Native Stream API heavily especially the ```Transfrom``` API.

Almost all the classes inherit a single NodeJs API class:

```javascript
 Transform
```

### installation

1. clone the repository:

 ```javascript
 git clone https://github.com/eweah/nodejs-tcp-and-http-server.git tcp-and-http-server
```

or

  ```javascript
 gh repo clone eweah/nodejs-tcp-and-http-server tcp-and-http-server
 ```

  Note: to use the command ```gh repo clone eweah/nodejs-tcp-and-http-server tcp-and-http-server``` you must have  Github CLI ```gh``` installed on your system.

2. cd in the directory:

```javascript
cd tcp-and-http-server
```

3. run the command:

```javascript
 yarn
```

4. run the command:

```javascript
 nodemon index
```

 After successfully runing the command ```node index``` or ```node index.js```  or ```nodemon index.js```  or ```nodemon index``` in step 3, the server should start.
