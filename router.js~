

var geoip = require('geoip-lite');
var commonHeaders = {'Content-Type': 'text/html'};

var http = require("http");
var util = require("util");

function homeRoute(request, response){
	
	if(request.url === "/"){
		if(request.method.toLowerCase() === "get"){
			response.writeHead(200, commonHeaders);	

			var ipAddr = '122.15.109.90';//request.headers["x-forwarded-for"];
  			if (ipAddr){
    				var list = ipAddr.split(",");
   				ipAddr = list[list.length-1];
 			 } 
			else {
   				 ipAddr = request.connection.remoteAddress;
  			}
			console.log("ipAddr::"+ipAddr);
			var query = geoip.lookup(ipAddr);
			console.log(query);

			var city =query.city;

	var request = http.get("http://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&APPID=bfb96733b03b5837c96c76cfb0556aa0", function(res){
   		var body = '';

    		if(res.statusCode !==200){
       			 request.abort();
       
    		}

  		//Read the data

    		res.on('data', function (chunk) {
      			body += chunk;
    		});

    		res.on('end', function(){
    		   if(res.statusCode === 200){
          		try{
             			 weatherData = JSON.parse(body);
             			 console.log(weatherData.name);

				 response.end("City: "+weatherData.name+" Temperature: "+weatherData.main.temp+" Humidity "+weatherData.main.humidity);
             
          		} catch(error){
             
          	   }
      	      }
	})

   	});
	} 
	}
}

module.exports.homeRoute = homeRoute;

