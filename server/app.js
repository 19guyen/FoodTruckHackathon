/**
 * 
 * expresspugbootstrap
 * -----------------------------------------------
 * An Node.JS template with
 *   — Express
 *   — Pug (formerly Jade) 
 *   — Bootstrap (pug-bootstrap)
 *
 * https://github.com/JANQLIANGTSAI/expresspugbootstrap
 * Copyright 2016-present, Max J. Tsai
 * All rights reserved.
 * -----------------------------------------------
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/** Express **/
var express = require('express');

/** Core **/
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');

/** optionals **/
var favicon = require('serve-favicon');

/** -------------- INIT ------------------ **/

// var app = express();

var app = require('express')();

/** -------------------------------------- **/

/** settings **/
// port
app.set('port', 8080);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/*app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' == req.method) {
  res.sendStatus(200);
  } else {
    next();
  }
});*/


/** favicon **/
app.use(favicon(__dirname + '/public/favicon.ico'));

/** ++ Socket.io ++ **/
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/node_modules/socket.io-client')));

/** Static Pages  **/
app.use(express.static(path.join(__dirname, 'public')));

/** view engine **/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// mapping css folder
app.use('/css/bootstrap', express.static(path.join(__dirname, 'node_modules/pug-bootstrap/css')));

/** cookies **/
app.use(cookieParser());

/** body parsing **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  //  res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// for multipart:  var upload = multer();

/** -------------------------------------- **/

app.get('/hello', function (req, res) {
   res.send('Hello World');
})

/** routing **/
var indexRoute = require('./routes/index');
app.use('/', indexRoute);

var server = app.listen(app.get('port'), function () {
   var host = server.address().address
   var port = server.address().port

   console.log(`Express Server listening at http://${host}:${port}`);
})
var io = require('socket.io')(server);

io.on('connection', function (socket) {

    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });

});
