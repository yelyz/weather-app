function celsius(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#today-temp-number");
  todayTemp.innerHTML = 22;

  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.classList.add("active-temp");
  let farenheitLink = document.querySelector("#farenheit");
  farenheitLink.classList.remove("active-temp");
}
function farenheit(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#today-temp-number");
  todayTemp.innerHTML = 72;

  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.classList.remove("active-temp");
  let farenheitLink = document.querySelector("#farenheit");
  farenheitLink.classList.add("active-temp");
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsius);
let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", farenheit);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#today-temp-number");
  tempDisplay.innerHTML = temperature;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
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
  let currentTemp = document.querySelector("#today-temp-number");
  currentTemp.innerHTML = temperature;
  let location = `${response.data.name
    .charAt(0)
    .toUpperCase()}${response.data.name.slice(1)}`;

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = location;
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

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${hours}:${minutes}`;

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

search("Kyiv");
