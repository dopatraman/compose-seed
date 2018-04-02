var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var dataController = require("./controllers/data");
var digmapsController = require("./controllers/digmaps");

var app = express();

app.use(bodyParser.json())

app.set("port", process.env.PORT || 3000);

/************************** ROUTES *****************************/
app.use(express.static('client'))
console.log(__dirname + process.env.NODE_MOD_DIR)
app.use('/modules', express.static(__dirname + process.env.NODE_MOD_DIR));
app.use('/assets', express.static(__dirname + process.env.STATIC_DIR));
app.use('/data', dataController);
app.use('/digmaps', digmapsController)

// Fire it up!
// NOTE: Using the http module because this is what
// express does internally anyway
http.createServer(app).listen(app.get("port"), function() {
	console.log("Express Web server listening on port " + app.get("port"));
});