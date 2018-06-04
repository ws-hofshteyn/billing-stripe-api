var stripe = require("stripe")(
    "sk_test_cY03qigypQzbZVaJGbw9n3TO"
);

stripe.customers.deleteCard(
    "cus_Cy8KXEEda28TlS",
    "card_1CYC3gFCOVIakxpdVAhYyCd2",
    function(err, confirmation) {
        console.log(confirmation)
    }
);

