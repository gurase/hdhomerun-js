var setupUserRoutes = require('./user');
var setupTunerRoutes = require('./tuner');

function setupRoutes(app) {
  setupUserRoutes(app);
  setupTunerRoutes(app);
}

module.exports = setupRoutes;