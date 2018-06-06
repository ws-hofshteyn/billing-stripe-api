'use strict';

var app = angular.module('StripeApp', [ 'ngRoute', 'ngResource' ] );
app.config(['$routeProvider',  function( $routeProvider ) {
    
    $routeProvider
        .when('/billing', { 
            templateUrl: 'app/billing/billing/billing.html', 
            controller: 'BillingCtrl', 
            // authenticate: true
        })
        .when('/subscriptions', {  
            templateUrl: 'app/billing/subscriptions/subscriptions.html', 
            controller: 'SubscriptionsCtrl', 
            // authenticate: true
        })
        .when('/payment', { 
            templateUrl: 'app/billing/payment/payment.html', 
            controller: 'PaymentCtrl', 
            // authenticate: true
        })
        .otherwise({ redirectTo: '/billing' });
 
}])