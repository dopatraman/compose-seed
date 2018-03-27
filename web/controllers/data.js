var express = require('express');
var request = require('request');
var router = express.Router();

router.post('/', function(req, res) {
	console.log('post received:', req.body);
    request.post({
        headers: {"Content-Type":"application/json"},
        url: 'http://api/data',
        body: req.body,
        json: true
    }, function(err, resp, body) {
        console.log(err, body);
    });
    res.sendStatus(200);
});

module.exports = router;