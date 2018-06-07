//

// TODO: get the  stripe id from server/config/environment file like config.stripe; everywhere. - done
// TODO: get the customer code (customerId) from the current accounts collection everywhere - done
var config = require('./../../config/environment');
var stripe = require('stripe')(config.stripe_key);

var AccountSchema = require('./../account/account.model');

exports.updateCard = function ( req, res ){
	

	console.log('\n req.body \n', req.body);
	
	stripe.customers.updateCard(
		req.body.id,
		req.body.sources.data[0].id,
		{
			exp_year		: req.body.sources.data[0].exp_year,
			exp_month		: req.body.sources.data[0].exp_month,
		},
		function(err, card) {
			if (err) {
				console.log('err', err);
				res.status(400).send({mesasge: err.message});
			} else {
				stripe.customers.update(
					req.body.id, {
						email			: req.body.email,
						metadata		: {
							name			: req.body.metadata.name,
							phone			: req.body.metadata.phone,
							address_zip		: req.body.metadata.address_zip,
							address_city	: req.body.metadata.address_city,
							address_country	: req.body.metadata.address_country,
						}
					}, function(_err, customer) {
						if (_err) {
							console.log('_err', _err);
							res.status(400).send({message: _err.message})
						} else {
							res.status(200).send(customer);
						}
					}
				)
			}
		}
	);


};
exports.getSingleCustomer = function ( req, res ) {
	// body...
	// var user = req.user; // the user.accountId is the id of the account where we store the stripe customer id
	// //

	console.log('req.user', req.user.accountId);
	AccountSchema.find({ _id : req.user.accountId }, function (err, account) {

		if(err) return res.status(400).send({message: err.message});
		if (account[0] && account[0].billing && account[0].billing.accountId) {
			stripe.customers.retrieve(
				account[0].billing.accountId,
				function(_err, customer) {
					if (_err)  {
						console.log('_err:', _err);
						res.status(400).send({message: _err.message});
					} else {
						console.log('customer', customer);
						res.status(200).send(customer);
					}
				}
			);
		} else {
			res.status(200).send({message: 'none'}); 
		} 

	})

};

exports.createTokenAndCustomerWithCard = function( req, res ) {
	// TODO: get the  stripe id from server/config/environment file like config.stripe; everywhere.

	var card = req.body;

	stripe.tokens.create({
	    card: {
	        number			: card.cardNumber,
	        exp_month		: card.cardMonth,
	        exp_year		: card.cardYear,
			cvc				: card.cardCVC,
	    }
	}, function(err, token) {
	    stripe.customers.create({
			source: token.id, // obtained with Stripe.js
			email: card.email,
			metadata: {
				phone: card.phone,
				name: card.name,
				address_country: card.source.address_country,
				address_city: card.source.address_city,
				address_zip: card.source.address_zip
			}
	    }, function(err, customer) {
			if (err) res.status(400).send(err);
			else {
				AccountSchema.findOneAndUpdate({_id : req.user.accountId}, { $set: {'billing.accountId' : customer.id } }, { new: true }, function (_err, user) {
					if (_err) console.log('Error:', _err);
					else res.status(201).send(customer);
				});
			}
	    });
	});
};

exports.addCard = function( req, res ) {

	var card = req.body;
	customerId = req.params.id;

	stripe.tokens.create({
	    card: {
	        number			: card.cardNumber,
	        exp_month		: card.cardMonth,
	        exp_year		: card.cardYear,
			cvc				: card.cardCVC,
	    }
	}, function (err, token) {
		if (err) {
			console.log('err', err);
			res.status(400).send({ message: err.message });
		} else {
			console.log('token', token);
		}
		stripe.customers.createSource(
			customerId, {
				source: token.id
			}, function (_err) {
				if (err) {
					console.log('_err', _err);
					res.status(400).send({ message: _err.message });
				} else {
					res.status(200).send();
				}
			}
		)
	})

	stripe.sources.create({
		type: 'card',
		currency: 'usd',
		owner: {
		  	email: 'jenny.rosen@example.com'
		}
	  }, function(err, source) {
		// asynchronously called
	  });
};

exports.removeCard = function( req, res ) {

	stripe.customers.deleteCard(
		req.params.id,
		req.params.source,
		function(err, confirmation) {
			if (err) res.status(400).send(err);
			else {
				// AccountSchema.findOneAndUpdate({_id : req.user.accountId}, { $set: {'billing.accountId' : null } }, { new: true }, function (_err, user) {
				// 	if (_err) res.status(400).send(_err);
				// 	else res.status(200).send({message: 'done'});
				// });
				res.status(200).send({message: 'done'});
			}
		}
	);
};
exports.listAllCustomers = function( req, res ) {
	
	stripe.customers.list(
		{ limit: 3 },
		function(err, customers) {
			console.log(customers)
		}
	);
};

exports.createSubscription = function (req, res) {
	

	stripe.subscriptions.create({
		customer: req.params.id,
		items: [
		  {
			plan: "",
		  },
		]
	  }, function(err, subscription) {
		}
	  );
}
/*
function createDefaultAcc () {
	AccountSchema.find({ _id : req.user.accountId }, function (err, user) {
		if (err) {
			console.log('err', err);
		} if (user && !user.length) {

			AccountSchema.create({ _id : req.user.accountId }, function (error, created_user) {
				if (error) console.log('error', error);
				else console.log('Default User created');
			})
			
		} else if (user && !user.length) {
			return;
		}
	})
}

createDefaultAcc();
*/
