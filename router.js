var cityWeather = require("./weather.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var geoip = require('geoip-lite');
var commonHeaders = {'Content-Type': 'text/html'};


function homeRoute(request, response){
	
	if(request.url === "/"){
		if(request.method.toLowerCase() === "get"){
			response.writeHead(200, commonHeaders);	


var ipAddr = request.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = request.connection.remoteAddress;
  }
				console.log("ipAddr::"+ipAddr);
				var query = geoip.lookup(ipAddr);
				console.log(query);


var city =query.city;

	var cityProfile = new cityWeather(city);

cityProfile.on("end", function(weatherData){

			var values = {
				WeatherIcon:weatherData.weather[0].icon,
				cityName:weatherData.name,
				temperature: weatherData.main.temp,
				humidity:weatherData.main.humidity,
				
			}		

		renderer.view("profile", values, response);
		response.end();
		});

			//renderer.view("search", {}, response);		
			//response.end();
		} 
	}
}

/*function userRoute(request,response){

	var city = request.url.replace("/", "");

	if (city.length > 0){
		response.writeHead(200, commonHeaders);
		
		var cityProfile = new cityWeather(city);

		//var ip=request.headers['x-forwarded-for'] || request.connection.remoteAddress;
		//console.log("ip::"+ip);
		//var geo = geoip.lookup(ip);

		cityProfile.on("end", function(weatherData){

			var values = {
				WeatherIcon:weatherData.weather[0].icon,
				cityName:weatherData.name,
				temperature: weatherData.main.temp,
				humidity:weatherData.main.humidity,
				
			}		

		renderer.view("profile", values, response);
		response.end();
		});

		
	}
}
*/
module.exports.homeRoute = homeRoute;
//module.exports.userRoute = userRoute;
