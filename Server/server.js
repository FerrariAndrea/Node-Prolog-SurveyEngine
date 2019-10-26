/*
 * frontend/frontendServer.js 
 */
var appl   = require('./applCode');  //previously was app;
var http   = require('http');
var port = 8080;

var createServer = function ( port ) {
  console.log("process.env.PORT=" + process.env.PORT + " port=" + port);
  
  server = http.createServer(appl);   
  
  server.on('listening', onListening);
  server.on('error', onError);
  server.listen( port );
};
createServer(8080);


function onListening() {
	  var addr = server.address();
	  var bind = typeof addr === 'string'
	    ? 'pipe ' + addr
	    : 'port ' + addr.port;
	  console.log('Listening on ' + bind);
}
function onError(error) {
	if (error.syscall !== 'listen') {
	    throw error;
	}
	 var bind = typeof port === 'string'
		    ? 'Pipe ' + port
		    : 'Port ' + port;
		  // handle specific listen errors with friendly messages;
		  switch (error.code) {
		    case 'EACCES':
		      console.error(bind + ' requires elevated privileges');
		      process.exit(1);
		      break;
		    case 'EADDRINUSE':
		      console.error(bind + ' is already in use');
		      process.exit(1);
		      break;
		    default:
		      throw error;
		  }
}