

var router = require("./router.js");
var port = process.env.PORT || 8080

var http = require('http');
var app = express.createServer(express.logger(),function(request, response){

	router.homeRoute(request,response);
	router.userRoute(request,response);

}).listen(port, '0.0.0.0', function() {
    console.log('Listening to port:  ' + port);
});



//var app = express.createServer(express.logger());




