var TunerService = require('../services/TunerService');

function setupTunerRoutes(app) {
    app.get('/channels', function(req, res) {
        var tuner = new TunerService();
        
        // TODO: error check
        tuner.getLineup(function(error, response, channels) {
            res.render('tuner/channels', {
                channels: channels,
                profiles: tuner.getProfiles()
            });
        });
    });

    app.get('/stream', function(req, res) {
        var tuner = new TunerService();
        var channel = req.query.channel;
        var transcode = req.query.transcode || undefined;
        
        console.log("stream started: " + channel);

        var stream = tuner.getStream(channel, transcode);
        stream.pipe(res).on("close", function() {
            console.log("stream ended: " + channel);
            stream.abort();
        });
    });
};

module.exports = setupTunerRoutes;
