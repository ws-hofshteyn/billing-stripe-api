
		/**/
		var express = require('express');
		var mongoose = require('mongoose');
		//var config = require('./config/environment');


		// Connect to database
		mongoose.connect(config.mongo.uri, config.mongo.options);

		// Populate DB with sample data
	

		// Setup server
		var app = express();


		var server = require('http').createServer(app);
		//require('./config/express')(app);
		require('./routes')(app);
        // Start server
		server.listen(config.port, config.ip, function () {
		  console.log('%s Express server listening on %d, in %s mode', new Date(), config.port, app.get('env'));
		});
		// Start sockets
		// Expose app
		exports = module.exports = app;