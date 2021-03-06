'use strict';

app.controller('AddCardCtrl', ['BillingServices', '$scope', '$location', function(BillingServices, $scope, $location) {

	$scope.showView = false;
    $scope.runProcess = false;
    $scope.customer = null;
	
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
				$scope.customer = data;
			}
			$scope.showView = true;
		})
	}

	activate();

    $scope.addCard = function (form) {
		
        $scope.runProcess = true;
        
        if (!$scope.customer) {

            BillingServices.createBillingInfo($scope.card).$promise.then(function (data) {
                $location.path("/");
            })
        } else {

            BillingServices.addCard({id: $scope.customer.id}, {

                cardNumber  : $scope.card.cardNumber,
                cardMonth   : $scope.card.cardMonth,
                cardYear    : $scope.card.cardYear,
                cardCVC     : $scope.card.cardCVC

            }).$promise.then(function (data) {
                $location.path("/");
            })
        }
        
	
	}
	
	// $scope.removeCard = function () {
	// 	$scope.runProcess = true;
	// 	BillingServices.removeCard({id: $scope.customer.id, cmd2: $scope.customer.sources.data[0].id}).$promise.then(function (data) {
	// 		$route.reload();
	// 	})
	// }

	// $scope.updateCard = function () {
	// 	$scope.runProcess = true;
	// 	console.log('$scope.customer', $scope.customer);
	// 	BillingServices.updateCard($scope.customer).$promise.then(function(customer) {
	// 		console.log('customer', customer);
	// 		$scope.customer = customer;
	// 		$scope.runProcess = false;
	// 	})
	// }

}])