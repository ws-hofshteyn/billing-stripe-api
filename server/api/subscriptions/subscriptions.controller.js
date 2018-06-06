//

// TODO: get the  stripe id from server/config/environment file like config.stripe; everywhere. - done
// TODO: get the customer code (customerId) from the current accounts collection everywhere - done
var config = require('./../../config/environment');
var stripe = require('stripe')(config.stripe_key);

var AccountSchema = require('./../account/account.model');

exports.getPlans = function ( req, res ) {

    AccountSchema.find({ name : 'Simba'}, function (err, user) {
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
    console.log('req.params', req.params);
    // AccountSchema.find({ name : 'Simba'}, function (err, user) {
    //     if (err) {
    //         console.log('err', err);
    //         res.status(400).send({message: err.message});
    //     } else {
    //         if (user[0] && user[0].billing && user[0].billing.accountId) {

    //             var cunstomerId = user[0].billing.accountId;

    //             stripe.plans.retrieve(
    //                 'plan_CzbqQlMsomhyjS',
    //                 function (_err, plan) {
    //                     if (_err) {
    //                         console.log(_err, err);
    //                         res.status(400).send({message: _err.message});
    //                     } else {
    //                         res.status(200).send(plan);
    //                     }
    //                 }
    //             )
    //         }
    //     }
    // })
};

