'use strict';

app.controller('SubscriptionsCtrl', ['$scope', '$route', 'BillingServices', function($scope, $route, BillingServices) {
    
    $scope.customer = null;
    $scope.showView = false;
    $scope.runProcess = false;
    
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
}])