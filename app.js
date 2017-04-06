var express = require('express');
var app = express();
var http = require('http');
var geoip = require('geoip-lite');
var port = process.env.PORT || 8080


app.get('/', function (req, res) {
 
//var ipAddr ='122.15.109.90';// request.headers["x-forwarded-for"];
var ipAddr =request.headers["x-forwarded-for"];
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

var request = http.get("http://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&APPID=bfb96733b03b5837c96c76cfb0556aa0", function(response){
    var body = '';

    if(response.statusCode !==200){
        request.abort();
       
    }

  //Read the data

    response.on('data', function (chunk) {
      body += chunk;
    
    });

    response.on('end', function(){
    	if(response.statusCode === 200){
          try{
              weatherData = JSON.parse(body);
              console.log(weatherData.name);

res.end("City: "+weatherData.name+" Temperature: "+weatherData.main.temp+" Humidity "+weatherData.main.humidity);
             
          } catch(error){
             
          }
      }

    
  	
    })

  });





})

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
