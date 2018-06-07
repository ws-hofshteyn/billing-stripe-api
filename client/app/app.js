'use strict';

var app = angular.module('StripeApp', [ 'ngRoute', 'ngResource' ] );
app.config(['$routeProvider',  function( $routeProvider ) {
    
    $routeProvider
        .when('/', { 
            templateUrl: 'app/main.html' 
            // controller: 'BillingCtrl', 
            // authenticate: true
        })
        .when('/add-card', { 
            templateUrl: 'app/billing/addCard/addCard.html', 
            controller: 'AddCardCtrl', 
            // authenticate: true
        })
        .when('/edit-card', { 
            templateUrl: 'app/billing/editCard/editCard.html', 
            controller: 'EditCardCtrl', 
            // authenticate: true
        })
}])