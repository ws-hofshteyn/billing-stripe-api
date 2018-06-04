

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
	stripe.tokens.create({
	    card: {
	        "number": '4242424242424242',
	        "exp_month": 1,
	        "exp_year": 2019,
	        "cvc": '123'
	    }
	}, function(err, token) {
	    stripe.customers.create({
	        description: 'Customer for alexander.anderson@example.com',
	        source: token.id // obtained with Stripe.js
	    }, function(err, customer) {
	        console.log(customer)
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
