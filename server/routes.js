'use strict';

var express = require('express');
var errors = require('./components/errors');
var router = express.Router();
var auth = require('./auth/auth.service');


module.exports = function(app) {

  // Insert routes below
  app.use('/api/billing', require('./api/billing'));
  app.use('/api/subscriptions', require('./api/subscriptions'));
  
  //app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      //console.log('subdomain: %s', req.headers['x-subdomain']);
      // /Users/fabriziomiglior/Development/billing-stripe-api/
      //res.sendFile( __dirname +'/../client/index.html');//
      res.sendfile( '/Users/fabriziomiglior/Development/billing-stripe-api/client/index.html');//
    });

};
