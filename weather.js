
var http = require("http");
var util = require("util");

function City(city){

  
//Connect to the API
  var request = http.get("http://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&APPID=bfb96733b03b5837c96c76cfb0556aa0", function(response){
  var body = "";

  if(response.statusCode !==200){
        request.abort();

        
   }

    response.on('data', function (chunk) {
      	body += chunk;
      	
    });

    response.on('end', function(){
	if(response.statusCode === 200){
   	  try{
              var weatherData = JSON.parse(body);
             
           } 
	catch(error){
             
           }
        }
    
    }).on("error", function(error){
      
    });

  });

}
util.inherits( City);

module.exports = City;

