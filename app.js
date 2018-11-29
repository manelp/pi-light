var express = require('express'),
	path = require('path'),
	async = require('async'),
	Gpio = require('onoff').Gpio;
	sleep = require('sleep'),
	app = express();


app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname + '/public'));

app.post('/api/open', function(req, res){
	var sw = new Gpio(17, 'out');
	async.series([
		function(callback) {
			sw.writeSync(1);
		},
		function(callback) {
			// Turn the relay on
			sw.writeSync(0);
			sleep.msleep(500);
			sw.writeSync(1);
		},
		function(callback) {
			// Turn the relay on
			sw.unexport();
		},
		function(err, results) {
			res.json("ok");
		}
	]);
});

app.listen(app.get('port'));
