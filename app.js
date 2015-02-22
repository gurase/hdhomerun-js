var config = require('./config');
var request = require('request');
var express = require('express');
var ko = require('knockout');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/channels', function(req, res) {
    request.get(config.hdhr.host + '/lineup.json').pipe(res);
});

app.get('/channels/:channel', function(req, res) {
    var options = {
        url: config.hdhr.host + ':5004/auto/v' + req.params.channel,
        qs: { transcode: req.query.transcode }
    };
    
    console.log("stream started: " + req.params.channel);
    
    var clientrequest = request.get(options);
    clientrequest.pipe(res).on("close", function() {
        console.log("stream ended: " + req.params.channel);
        clientrequest.abort();
    });
});

http.listen(3001, function() {
    console.log('listening on *:3001');
});