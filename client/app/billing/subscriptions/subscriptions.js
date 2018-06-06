'use strict';

app.controller('SubscriptionsCtrl', ['$scope', '$route', 'BillingServices', 'SubscriptionsServices', function($scope, $route, BillingServices, SubscriptionsServices) {
    
    $scope.customer = null;
    $scope.plan = null;
    $scope.showView = false;
    $scope.runProcess = false;
    
    function activate() {

        BillingServices.getInfo().$promise.then(function (customer) {
            console.log('customer', customer);
            $scope.customer = customer;
        })

        SubscriptionsServices.getPlan().$promise.then(function (plan) {
            console.log('plan', plan);
            $scope.plan = plan;
        })
        
		$scope.showView = true;
    }
    activate();
    
    $scope.subscribePlan = function (planId) {
        console.log('planId', planId);
        SubscriptionsServices.subscribePlan({'id': planId}).$promise.then(function (sub) {
            console.log('sub', sub);
        })
    }

}])