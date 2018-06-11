'use strict';

app.controller('SubscriptionsCtrl', ['$scope', '$route', 'BillingServices', 'SubscriptionsServices', function($scope, $route, BillingServices, SubscriptionsServices) {
    
    $scope.customer = null;
    $scope.plan = null;
    $scope.subscriptions = null;
    $scope.showView = false;
    $scope.runProcess = false;
    
    function activate() {

        BillingServices.getInfo().$promise.then(function (customer) {
            $scope.customer = customer;
            if (!$scope.customer.message) {

                SubscriptionsServices.getSubscriptions().$promise.then(function (subscriptions) {
                    $scope.plan = subscriptions.data[0].plan;
                    console.log(subscriptions)
                })
            }
		    $scope.showView = true;
            
        })

        
    }
    activate();
    
    $scope.subscribePlan = function (planId) {
        $scope.runProcess = true;
        SubscriptionsServices.subscribePlan({'id': planId}).$promise.then(function (sub) {
            $route.reload();
        })
    }

}])