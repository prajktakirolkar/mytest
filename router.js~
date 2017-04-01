var cityWeather = require("./weather.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var geoip = require('geoip-lite');
var commonHeaders = {'Content-Type': 'text/html'};


function homeRoute(request, response){
	
	if(request.url === "/"){
		if(request.method.toLowerCase() === "get"){
			response.writeHead(200, commonHeaders);
			
			renderer.view("search", {}, response);
			
			response.end();
		} else{
			request.on("data", function(postBody){

				var ip1 = "122.15.109.90";
				var query = geoip.lookup(ip1);

				console.log(query);

				//var query = querystring.parse(postBody.toString());
				response.writeHead(303, {"Location": "/" + query.city});
				response.end();
			});
		}
	}
}

function userRoute(request,response){

	var city = request.url.replace("/", "");

	if (city.length > 0){
		response.writeHead(200, commonHeaders);
		

		var cityProfile = new cityWeather(city);
var ip1 = "122.15.109.90";
var geo1 = geoip.lookup(ip1);

console.log(geo1);



		var ip=request.headers['x-forwarded-for'] || request.connection.remoteAddress;
		console.log("ip::"+ip);
		var geo = geoip.lookup(ip);
               // console.log("log::"+geo.city);
		cityProfile.on("end", function(weatherData){

			var values = {
				WeatherIcon:weatherData.weather[0].icon,
				cityName:weatherData.name,
				temperature: weatherData.main.temp,
				humidity:weatherData.main.humidity,
				//location:geo.city,
			}
				//simple response

		renderer.view("profile", values, response);
		//renderer.view("footer", {}, response);
		response.end();
		});

		
	}
}

module.exports.homeRoute = homeRoute;
module.exports.userRoute = userRoute;
