const apikey = "fc23f3d15fe82766be499abecf9ba733";

let latitude;
let longitude;
const notification = document.getElementsByClassName("notification")[0];

function getLocation() {
  //console.log(navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    notification.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function onSuccess(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  const weather = fetch(
    "https://api.openweathermap.org/data/2.5/weather?" +
      "lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apikey
  );
  weather
    .then((response) => response.json())
    .then((weather) => {
      console.log(weather);
      console.log(weather.weather[0].icon);
      console.log(parseInt(weather.main.temp - 273.15));
      console.log(weather.weather[0].main);
      console.log(weather.name);
    });
}
//console.log("info", weather);
//console.log(position);
//latitude=position.coords.

function onError(error) {
  console.error(error);
  //notification[0].innerHTML = error.message;
  const p = document.createElement("p");
  p.innerHTML = error.message;
  notification.style.display = "block";
  notification.appendChild(p);
}
getLocation();
