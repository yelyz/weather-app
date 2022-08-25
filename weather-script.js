function celsius(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#today-temp-number");
  todayTemp.innerHTML = Math.round(celsiusTemp);

  celsiusLink.classList.add("active-temp");
  farenheitLink.classList.remove("active-temp");
}
function farenheit(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#today-temp-number");
  todayTemp.innerHTML = Math.round(celsiusTemp * (9 / 5) + 32);

  celsiusLink.classList.remove("active-temp");
  farenheitLink.classList.add("active-temp");
}

function formatForecastDate(date) {
  let forecastDate = new Date(date * 1000);
  let forecastMonth = forecastDate.getMonth();
  let forecastMonthDay = forecastDate.getDate();
  let forecastWeekday = forecastDate.getDay();

  return `${months[forecastMonth]} ${forecastMonthDay}, ${weekdays[forecastWeekday]}`;
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
                    id="day-one-icon"
                    class="forecast-icons"
                  />
                </div>
                <div class="col-8">
                  <p class="day">${formatForecastDate(
                    day.dt
                  )}<br /><span class="forecast-temp"
                      >${Math.round(day.temp.max)}°C / ${Math.round(
          day.temp.min
        )}°C</span
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude={part}&appid=${apiKey}&units=metric`;
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
  celsiusTemp = temperature;
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
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

  celsiusLink.classList.add("active-temp");
  farenheitLink.classList.remove("active-temp");
}

function search(response) {
  let apiKey = "11012146b3dbe3f297a131f8ee033e20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${response}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
  search(searchInput.value);
}

function showCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  celsiusTemp = temperature;

  let currentTemp = document.querySelector("#today-temp-number");
  currentTemp.innerHTML = temperature;
  let location = `${response.data.name
    .charAt(0)
    .toUpperCase()}${response.data.name.slice(1)}`;

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = location;

  celsiusLink.classList.add("active-temp");
  farenheitLink.classList.remove("active-temp");

  getForecast(response.data.coord);
}

function getLocation(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = "11012146b3dbe3f297a131f8ee033e20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(getLocation);
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

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsius);
let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", farenheit);

search("Kyiv");
