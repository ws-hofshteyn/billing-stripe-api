'use strict';

app.controller('EditCardCtrl', ['BillingServices', '$scope', '$location', function(BillingServices, $scope, $location) {

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
		BillingServices.updateCard($scope.customer).$promise.then(function(customer) {
			$scope.customer = customer;
            $scope.runProcess = false;
            $location.path("/");
		})
	}

}])