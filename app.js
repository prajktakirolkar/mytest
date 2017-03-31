//bfb96733b03b5837c96c76cfb0556aa0

var router = require("./router.js");
var port = process.env.PORT || 8000

var http = require('http');
http.createServer(function(request, response){

	router.homeRoute(request,response);
	router.userRoute(request,response);

}).listen(port, '0.0.0.0', function() {
    console.log('Listening to port:  ' + port);
});

console.log('Server running at localhost:8080');



