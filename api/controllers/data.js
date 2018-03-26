var promisify = require('util').promisify;
var express = require('express');
var request = require('request');
var DBService = require('../service/db');
var LandingPageService = require('../service/landing');
var router = promisify(express.Router);

var landingSvc = new LandingPageService(new DBService());

router.post('/')
	.then((req, res) => {
		console.log('post received:', req.body);
		return landingSvc.insertSubmission(req.body.userEmail);
	})
	.then(result => {
		return req.body.interests.length > 0 
			? landingSvc.insertInterests(result.rows[0]['id'], req.body.interests)
			: new Promise();
	})
	.then( () => {
		res.end('hello');
	})
	.catch(err => {
		console.log('Error!', err.stack);
	})

// router.post('/', function(req, res) {
// 	console.log('post received:', req.body);
// 	landingSvc.insertSubmission(req.body.userEmail)
// 		.then((result) => {
// 			console.log("result", result.rows[0]['id']);
// 			if (req.body.interests.length > 0) {
// 				return landingSvc.insertInterests(result.rows[0]['id'], req.body.interests);
// 			}
// 		})
// 		.catch((err) => {
// 			console.log("Error!", err.stack);
// 		});
// 	res.end("hello");
// });

module.exports = router;