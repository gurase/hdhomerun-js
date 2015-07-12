function setupUserRoutes(app) {
    app.get('/', function(req, res) {
        res.redirect('/channels');
    });
};

module.exports = setupUserRoutes;