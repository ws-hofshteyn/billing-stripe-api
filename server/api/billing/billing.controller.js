//
exports.updateCard = function ( req, res ) {
	var stripe = require("stripe")(
		"sk_test_cY03qigypQzbZVaJGbw9n3TO"
	);
	stripe.customers.updateCard(
		"cus_Cy8KXEEda28TlS",
		"card_1CYC3gFCOVIakxpdVAhYyCd2",
		{ name: "Barack Obama" },
		function(err, card) {
			console.log(card)
		}
	);


};
exports.getSingleCustomer = function ( req, res ) {
	// body...
	var user = req.user; // the user.accountId is the id of the account where we store the stripe customer id
	//
	var stripe = require("stripe")(
	    "sk_test_cY03qigypQzbZVaJGbw9n3TO"
	);

	stripe.customers.retrieve(
	    "cus_Cy8KXEEda28TlS",
	    function(err, customer) {
	        console.log(customer)
	    }
	);
};


exports.createTokenAndCustomerWithCard = function( req, res ) {

	var stripe = require('stripe')('sk_test_cY03qigypQzbZVaJGbw9n3TO');
	var card = req.body;

	stripe.tokens.create({
	    card: {
	        "number": card.cardNumber,
	        "exp_month": card.cardMonth,
	        "exp_year": card.cardYear,
	        "cvc": card.cardCVC
	    }
	}, function(err, token) {
	    stripe.customers.create({
	        description: 'Customer for alexander.anderson@example.com',
	        source: token.id // obtained with Stripe.js
	    }, function(err, customer) {
			console.log('customer', customer);
			res.status(200).send(customer);
	    });
	});
};

exports.removeCard = function( req, res ) {
	var stripe = require("stripe")(
		"sk_test_cY03qigypQzbZVaJGbw9n3TO"
	);

	stripe.customers.deleteCard(
		"cus_Cy8KXEEda28TlS",
		"card_1CYC3gFCOVIakxpdVAhYyCd2",
		function(err, confirmation) {
			console.log(confirmation)
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
