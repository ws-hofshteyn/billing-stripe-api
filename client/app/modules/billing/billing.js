'use strict';

app.controller('BillingCtrl', ['BillingServices', '$scope', '$route', function(BillingServices, $scope, $route) {

	$scope.showView = false;
	$scope.runProcess = false;
	
	//test 
    $scope.card = {
        cardNumber  : '4242424242424242',
        cardMonth   : '12',
        cardYear    : '2020',
		cardCVC     : '123',
		name		: 'John Doe',
		email		: 'test@test.com',
		phone		: '+1-541-754-3010',
		source	 	: {
			address_country: "USA",
			address_city: "New-York",
			address_zip: "10001"
		}
	};
	
	function activate() {

		BillingServices.getInfo().$promise.then(function (data) {
			if (data.message && data.message === 'none') {
				$scope.customer = null;
			} else {
				console.log('customer', data);
				$scope.customer = data;
			}
			$scope.showView = true;
		})
	}

	activate();

    $scope.addCard = function (form) {
		
		$scope.runProcess = true;
		BillingServices.createBillingInfo($scope.card).$promise.then(function (data) {
			$route.reload();
		})
	
	}
	
	$scope.removeCard = function () {
		$scope.runProcess = true;
		BillingServices.removeCard({id: $scope.customer.id, cmd2: $scope.customer.sources.data[0].id}).$promise.then(function (data) {
			$route.reload();
		})
	}

	$scope.updateCard = function () {
		$scope.runProcess = true;
		console.log('$scope.customer', $scope.customer);
		BillingServices.updateCard($scope.customer).$promise.then(function(customer) {
			console.log('customer', customer);
			$scope.customer = customer;
			$scope.runProcess = false;
		})
	}
    // $scope.billingInfo = BillingServices.getInfo();
    // $scope.listAllCustomers = BillingServices.listAllCustomers();

}])