var express = require('express');
var request = require('request');
var DBService = require('../service/db');
var LandingPageService = require('../service/landing');
var router = express.Router();

var landingSvc = new LandingPageService(new DBService());

router.post('/', (req, res) => {
	console.log('post received:', req.body);
	landingSvc.insertSubmission(req.body.userEmail)
		.then((result) => {
			return req.body.interests.length > 0
				? landingSvc.insertInterests(result.rows[0]['id'], req.body.interests)
				: false;
		})
		.catch((err) => {
			console.log("Error!", err.stack);
		});
	res.end("hello");
});

module.exports = router;