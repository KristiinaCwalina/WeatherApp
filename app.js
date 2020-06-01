const apikey = "a75595ec0a1e42379ec6d18c703db66a";

let latitude;
let longitude;
const notification = document.getElementsByClassName("notification")[0];

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(render, onError);
  } else {
    notification.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function kelvinToCelsius(temp) {
  return temp - 273.15;
}

function render(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  const get = fetch(
    "https://api.weatherbit.io/v2.0/current?" +
      "lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&key=" +
      apikey
  );
  get
    .then((response) => response.json())
    .then((get) => {
     

      const location = get.city_name;
      const loacationHtmlElement = document.getElementsByClassName("location")[0];
      loacationHtmlElement.innerHTML = "<p>" + location + "</p>";
      const temp = kelvinToCelsius(get.temp).toFixed(1);
      const tempHtmlElement = document.getElementsByClassName("temperature-value")[0];
      tempHtmlElement.innerHTML = "<p>" + temp + "°<span>C</span></p>";
      const icon = get.weather.icon;
      const iconHtmlElement = document.getElementsByClassName("weather-icon")[0];
      iconHtmlElement.innerHTML = "<img src='icons/" + icon + ".png' alt=''></img>";
      const weatherDescription = get.weather.description;
      const weatherDescriptionHtmlElement = document.getElementsByClassName(
        "temperature-description"
      )[0];
      weatherDescriptionHtmlElement.innerHTML = "<p>" + weatherDescription + "</p>";
    });
    
}


function onError(error) {
  console.error(error);
  const p = document.createElement("p");
  p.innerHTML = error.message;
  notification.style.display = "block";
  notification.appendChild(p);
}
getLocation();
