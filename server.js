// server.js
// where your node app starts
'use strict';
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

function unix(timestamp) {
  this.unix = timestamp.getTime();
  this.utc = timestamp.toUTCString();
}

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", function(req, res) {
  const time = new Date();
  const output = new unix(time);  
	res.json(output);
});

app.get("/api/timestamp/:input", function(req, res) {
  const str = req.params.input;
  const time = new Date(isNaN(str) ? str : Number(str));
  const output = new unix(time);
	res.json(output);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
