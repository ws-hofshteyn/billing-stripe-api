
var ObjectID = require('mongodb').ObjectID;
function isAuthenticated() {
	console.log("isAuthenticated called!!!");
	return function(req, res, next) {
		// req.user = {accountId: ObjectID('5b16b773525a1879d1bfb04c')}; //loai
		req.user = {accountId: ObjectID('5b1911bf0bb64a96e2858cbb')};
		next();
	}
};

exports.isAuthenticated = isAuthenticated;
