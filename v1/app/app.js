var express = require('express'),
	ops = require('../app-mem/ops.js'),
	app = express();

app
.post('/:sandbox/*', function(req, res) {

	var sandbox = req.params.sandbox;
	var keyPath = req.params[0];
	keyPath = keyPath.replace(/\//g,'.');

	ops.createKey(sandbox, keyPath, function (err, results) {

		if(err){
			res.status(404).json({success: false});
		} else {
			res.status(200).json({data: results, success: true});
		}

	});

}).get('/:sandbox/*', function(req, res){

	var sandbox = req.params.sandbox;
	var keyPath = req.params[0];
	keyPath = keyPath.replace(/\//g,'.');

	ops.getKey(sandbox, keyPath, function(err, results){


		if(err){
			res.status(404).json({success: false});
		} else {
			res.status(200).json({data: results, success: true});
		}


	});


}).put('/:sandbox/*', function(req, res){

	var sandbox = req.params.sandbox;
	var keyPath = req.params[0];
	keyPath = keyPath.replace(/\//g,'.');

	ops.upsertKey(sandbox, keyPath, function(err, results){


		res.status(200).json({data: results, success: true});


	});

}).delete('/:sandbox/*', function(req, res){

	var sandbox = req.params.sandbox;
	var keyPath = req.params[0];
	keyPath = keyPath.replace(/\//g,'.');

	ops.deleteKey(sandbox, keyPath, function(err, results){

		if(err){
			res.status(200).json({success: false});
		} else {
			res.status(201).json({data: results, success: true});
		}

	});

});

app.listen(3002, '127.0.0.1', function () {
	var host = this.address().address;
	var port = this.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});