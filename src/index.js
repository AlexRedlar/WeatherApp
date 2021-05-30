// Search City

function cityInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

let form = document.querySelector("#form-all");
form.addEventListener("submit", cityInput);

// Display Date

function currentDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  let currentDate = new Date();
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let dateOfMonth = currentDate.getDate();
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDateTime = document.querySelector("#date");
  currentDateTime.innerHTML = `${day}, ${dateOfMonth} ${month} ${year} <br /> <small>Last updated: ${hours}:${minutes}</small>`;
}

currentDate();

//convert temp

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureC = document.querySelector("#displayed-temp");
  temperatureC.innerHTML = Math.round(celsiusTemp);
}

let celsiusLink = document.querySelector("#change-to-C");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureF = document.querySelector("#displayed-temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureF.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#change-to-F");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Search Engine

function searchCity(city) {
  let apiKey = `17e48d0a69e4a55c080a86ff5a2172bd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  celsiusTemp = response.data.main.temp;

  let searchCity = document.querySelector("#city");
  searchCity.innerHTML = response.data.name;
  let searchTemp = document.querySelector("#displayed-temp");
  searchTemp.innerHTML = Math.round(response.data.main.temp);
  let weatherDis = document.querySelector("#temp-description");
  weatherDis.innerHTML = response.data.weather[0].description;
  let humidityValue = document.querySelector("#humidity-value");
  humidityValue.innerHTML = response.data.main.humidity;
  let windValue = document.querySelector("#wind-value");
  windValue.innerHTML = Math.round(response.data.wind.speed);
  let pressure = document.querySelector("#pressure-value");
  pressure.innerHTML = response.data.main.pressure;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `images/icons/${response.data.weather[0].icon}.svg`
  );
}

function searchLocation(position) {
  let apiKey = `17e48d0a69e4a55c080a86ff5a2172bd`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocStat(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocStat);

let celsiusTemp = null;
