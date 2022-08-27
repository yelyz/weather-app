function formatForecastDate(date) {
  let forecastDate = new Date(date * 1000);
  let forecastMonth = forecastDate.getMonth();
  let forecastMonthDay = forecastDate.getDate();
  let forecastWeekday = forecastDate.getDay();

  let monthsForecast = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthsForecast[forecastMonth]} ${forecastMonthDay}, ${weekdays[forecastWeekday]}`;
}

function displayForecast(response) {
  let forecastDays = response.data.daily;
  let forecastElement = document.querySelector("#forecast-block");
  let forecastBlock = ``;
  forecastDays.forEach(function (day, index) {
    if (index < 6 && index > 0) {
      forecastBlock =
        forecastBlock +
        `
<div class="row">
                <div class="col-4">
                  <img
                    src="http://openweathermap.org/img/wn/${
                      day.weather[0].icon
                    }@2x.png"
                    class="forecast-icons"
                  />
                </div>
                <div class="col-8">
                  <p class="day">${formatForecastDate(
                    day.dt
                  )}<br /><span class="forecast-temp"
                      >${Math.round(day.temp.max)}° / ${Math.round(
          day.temp.min
        )}°</span
                    >
                  </p>
                </div>
              </div>`;
    }
  });
  forecastElement.innerHTML = forecastBlock;
}

function getForecast(coords) {
  let apiKey = "11012146b3dbe3f297a131f8ee033e20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude={part}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function getForecastAgain(lat, lon) {
  let apiKey = "11012146b3dbe3f297a131f8ee033e20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  getForecast(response.data.coord);
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#today-temp-number");
  tempDisplay.innerHTML = temperature;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  feelsLikeTemperature = response.data.main.feels_like;
  if (units === "imperial") {
    feelsLikeTemperature = (response.data.main.feels_like - 32) * (5 / 9);
  }
  celsiusTemp = response.data.main.temp;
  if (units === "imperial") {
    celsiusTemp = (response.data.main.temp - 32) * (5 / 9);
  }

  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  minTemperature = response.data.main.temp_min;
  if (units === "imperial") {
    minTemperature = (response.data.main.temp_min - 32) * (5 / 9);
  }
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  maxTemperature = response.data.main.temp_max;
  if (units === "imperial") {
    maxTemperature = (response.data.main.temp_max - 32) * (5 / 9);
  }
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description
    .charAt(0)
    .toUpperCase()}${response.data.weather[0].description.slice(1)}`;
  let currentIcon = document.querySelector("#today-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  lat = response.data.coord.lat;
  lon = response.data.coord.lon;
}

function search(response) {
  let apiKey = "11012146b3dbe3f297a131f8ee033e20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${response}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
  search(searchInput.value);
}

function showCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  celsiusTemp = response.data.main.temp;
  if (units === "imperial") {
    celsiusTemp = (response.data.main.temp - 32) * (5 / 9);
  }

  let currentTemp = document.querySelector("#today-temp-number");
  currentTemp.innerHTML = temperature;
  let location = `${response.data.name
    .charAt(0)
    .toUpperCase()}${response.data.name.slice(1)}`;

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = location;

  getForecast(response.data.coord);

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  feelsLikeTemperature = response.data.main.feels_like;
  feelsLikeTemperature = response.data.main.feels_like;
  if (units === "imperial") {
    feelsLikeTemperature = (response.data.main.feels_like - 32) * (5 / 9);
  }
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  minTemperature = response.data.main.temp_min;
  if (units === "imperial") {
    minTemperature = (response.data.main.temp_min - 32) * (5 / 9);
  }
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  maxTemperature = response.data.main.temp_max;
  if (units === "imperial") {
    maxTemperature = (response.data.main.temp_max - 32) * (5 / 9);
  }
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description
    .charAt(0)
    .toUpperCase()}${response.data.weather[0].description.slice(1)}`;
  let currentIcon = document.querySelector("#today-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getLocationAgain(lat, lon) {
  let apiKey = "11012146b3dbe3f297a131f8ee033e20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function getLocation(response) {
  lat = response.coords.latitude;
  lon = response.coords.longitude;
  let apiKey = "11012146b3dbe3f297a131f8ee033e20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function celsius(event) {
  event.preventDefault();

  let todayTemp = document.querySelector("#today-temp-number");
  todayTemp.innerHTML = Math.round(celsiusTemp);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = Math.round(minTemperature);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = Math.round(maxTemperature);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(feelsLikeTemperature);

  let unitMax = document.querySelector("#unit-max");
  unitMax.innerHTML = "C";
  let unitMin = document.querySelector("#unit-min");
  unitMin.innerHTML = "C";
  let unitFeelsLike = document.querySelector("#unit-feels-like");
  unitFeelsLike.innerHTML = "C";

  celsiusLink.classList.add("active-temp");
  farenheitLink.classList.remove("active-temp");
  units = "metric";
  getForecastAgain(lat, lon);
}
function farenheit(event) {
  event.preventDefault();

  let todayTemp = document.querySelector("#today-temp-number");
  todayTemp.innerHTML = Math.round(celsiusTemp * (9 / 5) + 32);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = Math.round(minTemperature * (9 / 5) + 32);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = Math.round(maxTemperature * (9 / 5) + 32);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(feelsLikeTemperature * (9 / 5) + 32);

  let unitMax = document.querySelector("#unit-max");
  unitMax.innerHTML = "F";
  let unitMin = document.querySelector("#unit-min");
  unitMin.innerHTML = "F";
  let unitFeelsLike = document.querySelector("#unit-feels-like");
  unitFeelsLike.innerHTML = "F";

  celsiusLink.classList.remove("active-temp");
  farenheitLink.classList.add("active-temp");
  units = "imperial";
  getForecastAgain(lat, lon);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

let date = new Date();

let weekday = date.getDay();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthDay = date.getDate();
let month = date.getMonth();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let hours = date.getHours();
let minutes = date.getMinutes();

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${months[month]} ${monthDay}, ${weekdays[weekday]} `;

if (minutes > 9) {
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hours}:${minutes}`;
} else {
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hours}:0${minutes}`;
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

let celsiusTemp = null;
let units = "metric";
let lat = null;
let lon = null;
let minTemperature = null;
let maxTemperature = null;
let feelsLikeTemperature = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsius);
let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", farenheit);

search("Kyiv");
