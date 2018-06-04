'use strict';

angular.module( 'app.billing', [ 'ngRoute', 'ngResource' ] )
.config(['$routeProvider',  function( $routeProvider ) {
  $routeProvider
  .when('/billing', { templateUrl: 'app/billing/billing.html', controller: 'BillingCtrl', authenticate: true})
  .otherwise({ redirectTo: '/billing' });
 
}])
.factory('BillingServices', [ '$resource', function($resource) {
	return $resource('/api/billing/:cmd/:id/:cmd2',
		{
			cmd: "@cmd"
		},
		{
			getInfo : {
				method: "GET",
				params: {
					cmd: "get-info"
				},
                cache: false,
				isArray: false
			},
			createBillingInfo : {
				method: "PUT",
				params: {
					cmd: "create-billing-info"
				},
                cache: false,
				isArray: false,
				stripTrailingSlashes: false
			},
			updateCard : {
				method: "PUT",
				params: {
					cmd: "update-card"
				},
                cache: false,
				isArray: false,
				stripTrailingSlashes: false
			},
			removeCard : {
				method: "GET",
				params: {
					cmd: "remove-card"
				},
                cache: false,
				isArray: false
			},
			listAllCustomers : {
				method: "GET",
				params: {
					cmd: "list-all-customers"
				},
                cache: false,
				isArray: false
			},
		}
	);
}])
.controller('BillingCtrl', ['BillingServices', '$scope', function(BillingServices, $scope) {

    var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
        base: {
            color: '#32325d',
            lineHeight: '18px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
            color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Handle form submission.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
            if (result.error) {
                // Inform the user if there was an error.
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server.
                stripeTokenHandler(result.token);
            }
        });
    });

    $scope.billingInfo = BillingServices.getInfo();
    $scope.listAllCustomers = BillingServices.listAllCustomers();

}])