const { parseString } = require('xml2js');

exports.parse = function(xmlString) {
    return new Promise((resolve, reject) => {
        parseString(xmlString, (err, result) => {
            if (err) { reject(err); }
            resolve(result);
        })
    })
}