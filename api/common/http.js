var request = require('request');

exports.get = function(url, opts) {
    return new Promise((resolve, reject) => {
        request.get({
            url: url,
            qs: opts || {}
        }, function(err, resp, body) {
            if (err) { reject(err); }
            resolve(body);
        });
    });
}

exports.getJSON = function(url, opts) {
    return new Promise((resolve, reject) => {
        request.get({
            headers: {"Content-Type":"application/json"},
            url: url,
            qs: opts || {}
        }, function(err, resp, body) {
            if (err) { reject(err); }
            resolve(body);
        });
    });
}