//

// TODO: get the  stripe id from server/config/environment file like config.stripe; everywhere.
// TODO: get the customer code (customerId) from the current accounts collection everywhere

exports.updateCard = function ( req, res ){
	
	console.log('req.body', req.body);
	
	var customer = req.body;
	var stripe = require("stripe")(
		"sk_test_cY03qigypQzbZVaJGbw9n3TO"
	);
	
	stripe.customers.updateCard(
		customer.id,
		customer.sources.data[0].id,
		{
			name			: customer.sources.data[0].name,
			exp_year		: customer.sources.data[0].exp_year,
			exp_month		: customer.sources.data[0].exp_month,
			address_zip		: customer.sources.data[0].address_zip,
			address_zip		: customer.sources.data[0].address_zip,
			address_city	: customer.sources.data[0].address_city,
			address_country	: customer.sources.data[0].address_country,
		},
		function(err, card) {
			if (err) console.log('err', err);
			console.log('customer', customer)
			res.status(200).send(card);
		}
	);


};
exports.getSingleCustomer = function ( req, res ) {
	// body...
	// var user = req.user; // the user.accountId is the id of the account where we store the stripe customer id
	// //
	var stripe = require("stripe")(
	    "sk_test_cY03qigypQzbZVaJGbw9n3TO"
	);

	stripe.customers.retrieve(
	    req.params.id,
	    function(err, customer) {
			if (err) console.log('err', err);
			console.log('customer', customer)
			res.status(200).send(customer);
	    }
	);
};


exports.createTokenAndCustomerWithCard = function( req, res ) {
	// TODO: get the  stripe id from server/config/environment file like config.stripe; everywhere.

	var stripe = require('stripe')('sk_test_cY03qigypQzbZVaJGbw9n3TO');
	var card = req.body;

	stripe.tokens.create({
	    card: {
	        "number"		: card.cardNumber,
	        "exp_month"		: card.cardMonth,
	        "exp_year"		: card.cardYear,
			"cvc"			: card.cardCVC
	    }
	}, function(err, token) {
	    stripe.customers.create({
	        description: card.description,
	        source: token.id // obtained with Stripe.js
	    }, function(err, customer) {
			console.log('customer', customer);
			res.status(201).send(customer);
	    });
	});
};

exports.removeCard = function( req, res ) {
	console.log('req.params', req.params);
	var stripe = require("stripe")(
		"sk_test_cY03qigypQzbZVaJGbw9n3TO"
	);

	stripe.customers.deleteCard(
		req.params.id,
		req.params.source,
		function(err, confirmation) {
			console.log(confirmation)
			res.sendStatus(200);
		}
	);
};
exports.listAllCustomers = function( req, res ) {
	var stripe = require('stripe')('sk_test_cY03qigypQzbZVaJGbw9n3TO');
	stripe.customers.list(
		{ limit: 3 },
		function(err, customers) {
			console.log(customers)
		}
	);
};
