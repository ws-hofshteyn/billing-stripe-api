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
				method: "DELETE",
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
.controller('BillingCtrl', ['BillingServices', '$scope', '$route', function(BillingServices, $scope, $route) {

	$scope.showView = false;
	$scope.runProcess = false
    //test 
    $scope.card = {
        cardNumber  : '4242424242424242',
        cardMonth   : '12',
        cardYear    : '2020',
		cardCVC     : '123',
		description : ''
	};
	
	function activate() {

		if (localStorage.getItem('customer_id') && localStorage.getItem('default_source')) {
			
			BillingServices.getInfo({id: localStorage.getItem('customer_id')}).$promise.then(function (customer) {
				console.log('customer', customer);
				$scope.customer = customer;
				$scope.showView = true;
			})
		} else {
			$scope.showView = true;
		}
	}

	activate();

    $scope.addCard = function (form) {
		
		$scope.runProcess = true;
		BillingServices.createBillingInfo($scope.card).$promise.then(function (data) {
			console.log('data', data);
			localStorage.setItem('customer_id', data.id);
			localStorage.setItem('default_source', data.default_source);
			$route.reload();
		})
	
	}
	
	$scope.removeCard = function () {
		$scope.runProcess = true;
		BillingServices.removeCard({id: $scope.customer.id, cmd2: $scope.customer.sources.data[0].id}).$promise.then(function (data) {
			console.log('data', data);
			localStorage.setItem('customer_id', '');
			localStorage.setItem('default_source', '');
			$route.reload();
		})
	}

	$scope.updateCard = function () {
		$scope.runProcess = true;
		BillingServices.updateCard($scope.customer).$promise.then(function(data) {
			$route.reload();
		})
	}
    // $scope.billingInfo = BillingServices.getInfo();
    // $scope.listAllCustomers = BillingServices.listAllCustomers();

}])