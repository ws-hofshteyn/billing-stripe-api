'use strict';

var express = require('express');
var SubController = require('./subscriptions.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

    router.get('/get-subscriptions', auth.isAuthenticated(), SubController.getSubscriptions );
    router.get('/subscribe-plan/:id', auth.isAuthenticated(), SubController.subscribePlan );

module.exports = router;
