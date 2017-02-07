var api = ""
  document.body.style.backgroundColor = "#AA0000";
function update(weather) {
  icon.src = "http://openweathermap.org/img/w/" + weather.code + ".png"
  temp.innerHTML = weather.temp;
  loc.innerHTML = weather.location;
  console.log(weather.code);





}

window.onload = function () {
    temp = document.getElementById("temp");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    status = document.getElementById('status');

  if(navigator.geolocation){
	var showPosition = function(position){
	    updateByGeo(position.coords.latitude, position.coords.longitude);
	}
	navigator.geolocation.getCurrentPosition(showPosition);
}

function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
         var data = JSON.parse(xmlhttp.responseText);
	       var weather = {};
         weather.code = data.weather[0].icon;
	       weather.location = data.name;
	       weather.temp = toCelcius(data.main.temp)+"°C";
         weather.status = data.weather[0].main;

	       update(weather);
	      }
      };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + api;
  sendRequest(url);

}
function toCelcius(kelvin){
    return Math.round(kelvin - 273.15);
}
}
