var config = require('../config');
var Channel = require('../models/Channel');
var request = require('request');

// TODO: possibly move to config
var CHANNEL_NUMBER = 'GuideNumber';
var CHANNEL_NAME = 'GuideName';
var URL = 'URL';
var TRANSCODE_PROFILES = [
    { display: 'default', value: '' },
    { display: 'raw', value: 'none' },
    { display: '1080', value: 'heavy' },
    { display: '720', value: 'mobile' },
    { display: '540', value: 'internet540' },
    { display: '360', value: 'internet360' },
    { display: '240', value: 'internet240' }
];

function TunerService() {
}

TunerService.prototype.getLineup = function(next) {
    request(config.hdhr.host + '/lineup.json', function(err, response, body) {
        if (!err && response.statusCode === 200) {
            var channels = [];
            var json = JSON.parse(body);
            
            for (var i in json) {
                var channel = new Channel(json[i][CHANNEL_NUMBER], json[i][CHANNEL_NAME]);
                channels.push(channel);
            }

            next(err, response, channels);
        }
        else {
            next(err, response, null);
        }
    });
};

TunerService.prototype.getStream = function(channel, transcode) {
    var options = {
        url: config.hdhr.host + ':5004/auto/v' + channel,
        qs: { transcode: transcode }
    };
    
    return request.get(options);
};

TunerService.prototype.getProfiles = function() {
    return TRANSCODE_PROFILES;
};

module.exports = TunerService;
