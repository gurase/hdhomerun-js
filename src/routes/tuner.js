var TunerService = require('../services/TunerService');

function setupTunerRoutes(app) {
    app.get('/channels', function(req, res) {
        var tuner = new TunerService();
        
        // TODO: error check
        tuner.getLineup(function(error, response, channels) {
            res.render('tuner/channels', {
                channels: channels
            });
        });
    });

    app.get('/channels/:channel', function(req, res) {
        var tuner = new TunerService();
        var channel = req.params.channel;
        var quality = req.query.transcode;

        console.log("stream started: " + channel);

        var stream = tuner.getStream(channel, quality);
        stream.pipe(res).on("close", function() {
            console.log("stream ended: " + channel);
            stream.abort();
        });
    });
};

module.exports = setupTunerRoutes;
