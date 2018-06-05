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
		BillingServices.updateCard($scope.customer).$promise.then(function(customer) {
			console.log('customer', customer);
			$scope.customer = customer;
			$scope.runProcess = false;
		})
	}
    // $scope.billingInfo = BillingServices.getInfo();
    // $scope.listAllCustomers = BillingServices.listAllCustomers();

}])