'use strict';

app.controller('BillingCtrl', ['BillingServices', '$scope', '$route', function(BillingServices, $scope, $route) {

	$scope.showView = false;
	$scope.runProcess = false;
	
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
	
	$scope.removeCard = function (sourceId) {
		$scope.runProcess = true;
		BillingServices.removeCard({id: $scope.customer.id, cmd2: sourceId}).$promise.then(function (data) {
			$route.reload();
		})
	}

}])