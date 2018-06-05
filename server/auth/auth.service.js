
var ObjectID = require('mongodb').ObjectID;
function isAuthenticated() {
	console.log("isAuthenticated called!!!");
	return compose()

	// Attach user to request
		.use(function(req, res, next) {
			req.user = {accountId: ObjectID('5b16b773525a1879d1bfb04c')};
			next();
		});
};


exports.isAuthenticated = isAuthenticated;
