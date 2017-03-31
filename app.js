//bfb96733b03b5837c96c76cfb0556aa0

var router = require("./router.js");

var http = require('http');
http.createServer(function(request, response){

	router.homeRoute(request,response);
	router.userRoute(request,response);

}).listen(8080, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});

console.log('Server running at localhost:8080');

