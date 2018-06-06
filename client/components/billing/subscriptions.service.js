'use strict';

app.factory('SubscriptionsServices', ['$resource', function ($resource) {
    return $resource('/api/subscriptions/:cmd/:id/:cmd2',
        {
            cmd: "@cmd"
        },
        {
            getPlan : {
                method: "GET",
                params: {
                    cmd: "get-subscriptions"
                },
                cache: false,
                isArray: false
            },
            subscribePlan : {
                method: "GET",
                params: {
                    cmd: "subscribe-plan"
                },
                cache: false,
                isArray: false,
                stripTrailingSlashes: false
            },
            // updateCard : {
            //     method: "PUT",
            //     params: {
            //         cmd: "update-card"
            //     },
            //     cache: false,
            //     isArray: false,
            //     stripTrailingSlashes: false
            // },
            // removeCard : {
            //     method: "DELETE",
            //     params: {
            //         cmd: "remove-card"
            //     },
            //     cache: false,
            //     isArray: false
            // },
            // listAllCustomers : {
            //     method: "GET",
            //     params: {
            //         cmd: "list-all-customers"
            //     },
            //     cache: false,
            //     isArray: false
            // },
        }
    );
}]);