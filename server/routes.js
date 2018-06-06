'use strict';

var express = require('express');
var BillingController = require('./api/billing/billing.controller');
var SubController = require('./api/subscriptions/subscriptions.controller');
var router = express.Router();
var auth = require('./auth/auth.service');

// /api/billing/...

module.exports = function(app) {

    router.post('/api/billing/create-billing-info',
            auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
            BillingController.createTokenAndCustomerWithCard
    );

	router.put('/api/billing/update-card',
		  auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
		  BillingController.updateCard
    );
    
	router.get('/api/billing/get-info',
        auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
        BillingController.getSingleCustomer
    );
    router.get('/api/billing/list-all-customers',
            auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
            BillingController.listAllCustomers
    );
    router.get('/api/subscriptions/get-subscriptions',
            auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
            SubController.getPlans
    );
    router.get('/api/subscriptions/subscribe-plan/:id',
            auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
            SubController.subscribePlan
    );

	router.delete('/api/billing/remove-card/:id/:source',
            auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
            BillingController.removeCard
	);

    app.use('/', router);
}
    
//    'use strict';

// // var express = require('express');
// //var errors = require('./components/errors');
// // var router = express.Router();
// //var auth = require('./auth/auth.service');
// var BillingController = require('./api/billing/billing.controller');


// module.exports = function(app) {

//   // // Insert routes below
//   // app.use('/api/billing', require('./api/billing'));
//   app.post('/api/billing/create-billing-info',        BillingController.createTokenAndCustomerWithCard);
  
//   app.get('/api/billing/get-info',                BillingController.getSingleCustomer);
  
//   app.put('/api/billing/update-card',     BillingController.updateCard);
  
//   app.delete('/api/billing/remove-card/:id/:source',  BillingController.removeCard);

//   // app.use('/auth', require('./auth'));

//   // // All undefined asset or api routes should return a 404
//   // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
//   //  .get(errors[404]);

//   // // All other routes should redirect to the index.html
//   // app.route('/*')
//   //   .get(function(req, res) {
//   //       console.log('subdomain: %s', req.headers['x-subdomain']);
    
//   //       res.sendFile(path.resolve(__dirname + './../client/index.html'));
//   //     });
//     app.get('/*', function (req, res) {
//       res.sendFile('index.html', {
//         root: __dirname + './../client'
//       });
//     });

// };
// }
