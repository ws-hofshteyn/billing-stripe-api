
var ObjectID = require('mongodb').ObjectID;
function isAuthenticated() {
	//console.log("isAuthenticated called!!!");
	return compose()

	// Attach user to request
		.use(function(req, res, next) {
			req.user = {accountId: ObjectID('code of your account _id')};
			next();
		});
};


exports.isAuthenticated = isAuthenticated;
