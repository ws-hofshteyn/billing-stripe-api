
var ObjectID = require('mongodb').ObjectID;
function isAuthenticated() {
	console.log("isAuthenticated called!!!");
	return function(req, res, next) {
		req.user = {accountId: ObjectID('5b1914dfef03e51fd0092418')}; //loai
		//req.user = {accountId: ObjectID('5b1911bf0bb64a96e2858cbb')};
		next();
	}
};

exports.isAuthenticated = isAuthenticated;
