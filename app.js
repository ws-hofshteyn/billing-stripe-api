
		/**/
		var express = require('express');
		var mongoose = require('mongoose');
		var bodyParser = require('body-parser');
		var config = require('./server/config/environment');


		// Connect to database
		mongoose.connect(config.mongo.uri, config.mongo.options);

		// Populate DB with sample data
	

		// Setup server
		var app = express();

		app.use(express.static(__dirname + '/client'));
		app.use(bodyParser.json());

		require('./server/routes')(app);
		var server = require('http').createServer(app);
		//require('./config/express')(app);
        // Start server
		server.listen(config.port, config.ip, function () {
		  console.log('%s Express server listening on %d, in %s mode', new Date(), config.port, app.get('env'));
		});
		// Start sockets
		// Expose app
		exports = module.exports = app;