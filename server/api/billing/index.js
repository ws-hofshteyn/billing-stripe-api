'use strict';

var express = require('express');
var controller = require('./billing.controller');
var router = express.Router();
//var auth = require('../../auth/auth.service');

// /api/billing/...

router.put(			'/billing/update-card',
					//auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
					controller.updateCard
			);
router.get(			'/billing/get-info',
					//auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
					controller.getSingleCustomer
			);
router.get(			'/billing/remove-card',
					//auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
					controller.removeCard
			);
router.get(			'/billing/list-all-customers',
					//auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
					controller.listAllCustomers
			);
router.put(			'/billing/create-billing-info', 
					//auth.isAuthenticated(),   // isAuthenticated() will check the auth token and fills the req with the user info in req.user
					controller.createTokenAndCustomerWithCard
			);

// ...

