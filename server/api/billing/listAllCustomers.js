var stripe = require('stripe')('sk_test_cY03qigypQzbZVaJGbw9n3TO');
stripe.customers.list(
    { limit: 3 },
    function(err, customers) {
        console.log(customers)
    }
);