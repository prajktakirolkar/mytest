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

/*

function getClientIp(req) {
  var ipAddress;
  // Amazon EC2 / Heroku workaround to get real client IP
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // Ensure getting client IP address still works in
    // development environment
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};


*/				

/*var ip1=request.header['x-forwarded-for'];
if (ip1) {
var ip = forwardedIpsStr.split(',');
    ip = forwardedIps[0];

}
if (!ip) {
    // Ensure getting client IP address still works in
    // development environment
    ip = req.connection.remoteAddress;
  }
*/
				var query = geoip.lookup(ip);

				var ip1=request.headers['x-forwarded-for'] || request.connection.remoteAddress;	
				var query = geoip.lookup(ip1);
				console.log(query);

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

		renderer.view("profile", values, response);
		response.end();
		});

		
	}
}

module.exports.homeRoute = homeRoute;
module.exports.userRoute = userRoute;
