var express = require('express'),
	path = require('path'),
	async = require('async'),
	gpio = require('pi-gpio'),
	sleep = require('sleep'),
	app = express();


app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname + '/public'));

app.post('/api/open', function(req, res){
	async.series([
		function(callback) {
			gpio.open(17, "out", function(err) {});
			gpio.write(17, 1, function(){});
		},
		function(callback) {
			// Turn the relay on
			gpio.write(17, 0, callback);
			sleep.msleep(500);
			gpio.write(17, 1, callback);
		},
		function(callback) {
			// Turn the relay on
			gpio.close(17, callback);
		},
		function(err, results) {
			res.json("ok");
		}
	]);
});

app.listen(app.get('port'));
