'use strict';

app.factory('BillingServices', ['$resource', function ($resource) {
    return $resource('/api/billing/:cmd/:id/:cmd2',
        {
            cmd: "@cmd"
        },
        {
            getInfo : {
                method: "GET",
                params: {
                    cmd: "get-info"
                },
                cache: false,
                isArray: false
            },
            createBillingInfo : {
                method: "POST",
                params: {
                    cmd: "create-billing-info"
                },
                cache: false,
                isArray: false,
                stripTrailingSlashes: false
            },
            updateCard : {
                method: "PUT",
                params: {
                    cmd: "update-card"
                },
                cache: false,
                isArray: false,
                stripTrailingSlashes: false
            },
            removeCard : {
                method: "DELETE",
                params: {
                    cmd: "remove-card"
                },
                cache: false,
                isArray: false
            },
            listAllCustomers : {
                method: "GET",
                params: {
                    cmd: "list-all-customers"
                },
                cache: false,
                isArray: false
            },
        }
    );
}]);