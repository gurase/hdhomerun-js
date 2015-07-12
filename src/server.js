var express = require('express');
var setupRoutes = require('./routes');

function setupStaticFiles(app) {
    app.use(express.static(__dirname + '/public'));
}

function setupViewEngine(app) {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
}

function createServer(next) {
    var app = express();
    
    setupRoutes(app);
    setupStaticFiles(app);
    setupViewEngine(app);
    
    next(app);
}

module.exports = {
    createServer: createServer
};