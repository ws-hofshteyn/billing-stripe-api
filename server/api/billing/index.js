'use strict';

var express = require('express');
var BillingController = require('./billing.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/create-billing-info', auth.isAuthenticated(), BillingController.createTokenAndCustomerWithCard );

	router.put('/update-card', auth.isAuthenticated(), BillingController.updateCard );
    
	router.get('/get-info', auth.isAuthenticated(), BillingController.getSingleCustomer );
    router.get('/list-all-customers', auth.isAuthenticated(), BillingController.listAllCustomers );
	router.delete('/remove-card/:id/:source', auth.isAuthenticated(), BillingController.removeCard );

module.exports = router;
