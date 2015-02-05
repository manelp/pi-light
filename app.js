var express = require('express'),
	path = require('path'),
	async = require('async'),
	gpio = require('pi-gpio'),
	app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname + '/public'));

//export pin
(function() {	
	gpio.open(16, "out", function(err) {});
})();

app.post('/api/on', function(req, res){
	async.series([
		function(callback) {
			// Turn the relay on
			gpio.write(16, 0, callback);
		},
		function(err, results) {
			res.json("ok");
		}
	]);
});

app.post('/api/off', function(req, res){
	async.series([
		function(callback) {
			// Turn the relay off
			gpio.write(16, 1, callback);
		},
		function(err, results) {
			res.json("ok");
		}
	]);
});

app.listen(app.get('port'));
