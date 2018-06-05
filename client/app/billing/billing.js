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
				method: "POST",
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
.controller('BillingCtrl', ['BillingServices', '$scope', '$http', function(BillingServices, $scope, $http) {

    //test 
    $scope.card = {
        cardNumber  : '4242424242424242',
        cardMonth   : '12',
        cardYear    : '2020',
        cardCVC     : '123'
    }

    $scope.addCard = function (form) {

		BillingServices.createBillingInfo($scope.card).$promise.then(function (data) {
			console.log('data', data);
		})
		// $http.post('/api/billing', {msg:'hello word!'})
		// 	.success(function (data) {
		// 		console.log('data');
		// 	})
		// 	.error(function (err) {
		// 		console.log('error:', err);
		// 	})
    }
    // $scope.billingInfo = BillingServices.getInfo();
    // $scope.listAllCustomers = BillingServices.listAllCustomers();

}])