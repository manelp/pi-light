var express = require('express'),
	path = require('path'),
	async = require('async'),
	gpio = require('pi-gpio'),
	app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname + '/public'));

app.post('/api/on', function(req, res){
	async.series([
		function(callback) {
			// Open pin for output
			gpio.open(16, "output", callback);
		},
		function(callback) {
			// Turn the relay on
			gpio.write(16, 0, callback);
		},
		function(err, results) {
			setTimeout(function() {
				// Close pin from further writing
				gpio.close(16);
				// Return json
				res.json("ok");
			}, 500);
		}
	]);
});

app.post('/api/off', function(req, res){
	async.series([
		function(callback) {
			// Open pin for output
			gpio.open(16, "output", callback);
		},
		function(callback) {
			// Turn the relay on
			gpio.write(16, 1, callback);
		},
		function(err, results) {
			setTimeout(function() {
				// Close pin from further writing
				gpio.close(16);
				// Return json
				res.json("ok");
			}, 500);
		}
	]);
});