//

// TODO: get the  stripe id from server/config/environment file like config.stripe; everywhere. - done
// TODO: get the customer code (customerId) from the current accounts collection everywhere - done
var config = require('./../../config/environment');
var stripe = require('stripe')(config.stripe_key);

var AccountSchema = require('./../account/account.model');


exports.getSubscriptions = function ( req, res ) {

    console.log('\n reached function #getPlans \n');

    AccountSchema.find({ _id : req.user.accountId }, function (err, user) {
        if (err) {
            console.log('err', err);
            res.status(400).send({message: err.message});
        } else {
            if (user[0] && user[0].billing && user[0].billing.accountId) {

                var customerId = user[0].billing.accountId;

                stripe.subscriptions.list(
                    {customer: customerId},
                    function (_err, subscriptions) {
                        if (_err) {
                            console.log(_err, err);
                            res.status(400).send({message: _err.message});
                        } else {
                            res.status(200).send(subscriptions);
                        }
                    }
                )
            }
        }
    })
};


exports.getPlans = function ( req, res ) {

    console.log('\n reached function #getPlans \n');

    AccountSchema.find({ _id : req.user.accountId }, function (err, user) {
        if (err) {
            console.log('err', err);
            res.status(400).send({message: err.message});
        } else {
            if (user[0] && user[0].billing && user[0].billing.accountId) {

                var cunstomerId = user[0].billing.accountId;

                stripe.plans.retrieve(
                    'plan_CzbqQlMsomhyjS',
                    function (_err, plan) {
                        if (_err) {
                            console.log(_err, err);
                            res.status(400).send({message: _err.message});
                        } else {
                            res.status(200).send(plan);
                        }
                    }
                )
            }
        }
    })
};

exports.subscribePlan = function ( req, res ) {

    console.log('\n reached function #subscribePlan \n');

    AccountSchema.find({ _id : req.user.accountId }, function (err, user) {
        if (err) {
            console.log('err', err);
            res.status(400).send({message: err.message});
        } else {
            if (user[0] && user[0].billing && user[0].billing.accountId) {

                var cunstomerId = user[0].billing.accountId;

                stripe.subscriptions.create(
                    {
                        customer: cunstomerId,
                        items: [
                            {
                                plan: req.params.id,
                            },
                        ]
                    }, function(_err, subscription) {
                        if (_err) {
                            console.log('_err', _err);
                            res.status(400).send({message: _err.message});
                        } else {
                            res.status(200).send(subscription);
                        }
                    }
                );
            }
        }
    })
};

