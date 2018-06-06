'use strict';

app.controller('PaymentCtrl', ['$scope', '$route', 'BillingServices', function($scope, $route, BillingServices) {
    
    $scope.customer = null;
    $scope.showView = false;
    $scope.runProcess = false;
    
    function activate() {

        BillingServices.getInfo().$promise.then(function (customer) {
            $scope.customer = customer;
            $scope.showView = true;
        })

        
    }
    activate();

}])