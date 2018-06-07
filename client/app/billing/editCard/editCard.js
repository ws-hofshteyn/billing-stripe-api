'use strict';

app.controller('EditCardCtrl', ['BillingServices', '$scope', '$route', function(BillingServices, $scope, $route) {

	$scope.showView = false;
	$scope.runProcess = false;
	
	
	function activate() {
        console.log('123');
		BillingServices.getInfo().$promise.then(function (data) {
			console.log(data);
			if (data.message && data.message === 'none') {
				$scope.customer = null;
			} else {
				$scope.customer = data;
			}
			$scope.showView = true;
			console.log($scope.customer, $scope.showView);
		})
	}

	activate();

	$scope.updateCard = function () {
		$scope.runProcess = true;
		console.log('$scope.customer', $scope.customer);
		BillingServices.updateCard($scope.customer).$promise.then(function(customer) {
			console.log('customer', customer);
			$scope.customer = customer;
			$scope.runProcess = false;
		})
	}

}])