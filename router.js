var cityWeather = require("./weather.js");
//var renderer = require("./renderer.js");
var querystring = require("querystring");
var geoip = require('geoip-lite');
var commonHeaders = {'Content-Type': 'text/html'};



var fs = require("fs");

function mergeValues(values, content){
	for(var key in values){
		content = content.replace("{{" + key + "}}", values[key]);
	}
	return content;
}


function view(templateName, values, response){

	
	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding:"utf8"});

	fileContents = mergeValues(values, fileContents);

	response.write(fileContents);

	
}


function homeRoute(request, response){
	
	if(request.url === "/"){
		if(request.method.toLowerCase() === "get"){



//var ipAddr ='122.15.109.90'; //request.headers["x-forwarded-for"];
var ipAddr=request.headers["x-forwarded-for"];//request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = request.connection.remoteAddress;
  }
console.log("new);
				console.log("ipAddr::"+ipAddr);
				var query = geoip.lookup(ipAddr);
				console.log(query);


var city =query.city;
console.log("city:"+city);



		response.writeHead(200, commonHeaders);
		
		var cityProfile = new cityWeather(city);

		var ip=request.headers['x-forwarded-for'] || request.connection.remoteAddress;
		console.log("ip::"+ip);
		var geo = geoip.lookup(ip);

		cityProfile.on("end", function(weatherData){

			var values = {
				WeatherIcon:weatherData.weather[0].icon,
				cityName:weatherData.name,
				temperature: weatherData.main.temp,
				humidity:weatherData.main.humidity,
				
			}		

		view("profile", values, response);
		response.end();
		});


		} 
	}
}



module.exports.homeRoute = homeRoute;

