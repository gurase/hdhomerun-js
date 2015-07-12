var config = require('../config');
var Channel = require('../models/Channel');
var request = require('request');

var CHANNEL_NUMBER = 'GuideNumber';
var CHANNEL_NAME = 'GuideName';
var URL = 'URL';

function TunerService() {
}

TunerService.prototype.getLineup = function(next) {
    request(config.hdhr.host + '/lineup.json', function(err, response, body) {
        if (!err && response.statusCode === 200) {
            var channels = [];
            var json = JSON.parse(body);
            
            for (var i in json) {
                var channel = new Channel(json[i][CHANNEL_NUMBER], json[i][CHANNEL_NAME], '/channels/' + json[i][CHANNEL_NUMBER]);
                channels.push(channel);
            }

            next(err, response, channels);
        }
        else {
            next(err, response, null);
        }
    });
};

TunerService.prototype.getStream = function(channel, quality) {
    var options = {
        url: config.hdhr.host + ':5004/auto/v' + channel,
        qs: { transcode: quality }
    };
    
    return request.get(options);
};

module.exports = TunerService;