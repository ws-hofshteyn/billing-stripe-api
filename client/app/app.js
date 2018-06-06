'use strict';

var app = angular.module('StripeApp', [ 'ngRoute', 'ngResource' ] );
app.config(['$routeProvider',  function( $routeProvider ) {
    
    $routeProvider
        .when('/', { 
            templateUrl: 'app/main.html' 
            // controller: 'BillingCtrl', 
            // authenticate: true
        })
}])