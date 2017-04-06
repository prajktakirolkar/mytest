var EventEmitter = require("events").EventEmitter;
var http = require("http");
var util = require("util");




function City(city){

  EventEmitter.call(this);

  profileEmitter = this;

//Connect to the API

  var request = http.get("http://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&APPID=bfb96733b03b5837c96c76cfb0556aa0", function(response){
    var body = "";

    if(response.statusCode !==200){
        request.abort();

        profileEmitter.emit("error", new Error("There was an error getting the weather data for " + city + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
    }


    response.on('data', function (chunk) {
      body += chunk;
      profileEmitter.emit("data", chunk);
    });

    response.on('end', function(){
    	if(response.statusCode === 200){
          try{
              var weatherData = JSON.parse(body);
             
              profileEmitter.emit("end", weatherData);
          } catch(error){
              profileEmitter.emit("error", error);
          }
      }
    
    }).on("error", function(error){
      profileEmitter.emit("error", error);
    });

  });

}

util.inherits( City, EventEmitter );

module.exports = City;

