'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountSchema = new Schema({
	name: String,
	billing: {
		provider: {type: String, enum: ['stripe'], default: 'stripe'},
		accountId: {type: String}
	},
	
});

module.exports = mongoose.model('Account', AccountSchema);