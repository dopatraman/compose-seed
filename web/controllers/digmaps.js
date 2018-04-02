var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {
	console.log('post received:', req.body);
    request.get({
        url: 'http://api/parcel'
    }, function(err, resp, body) {
        console.log(err, body);
    });
    res.sendStatus(200);
});

module.exports = router;