require('./src/server').createServer(function(app) {
  var server = require('http').Server(app);
  
  server.listen(3000, function() {
      console.log('listening on *:3000');
  });
});