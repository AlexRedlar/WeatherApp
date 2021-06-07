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

//5 day forcast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForcast5Day(response) {
  let fiveDayForecast = response.data.daily;
  let forcastElement = document.querySelector("#forecast-days");

  let forcastHTML = `<div class="row">`;
  fiveDayForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forcastHTML =
        forcastHTML +
        `
	  <div class="col">
		<h5 class="day+1">
              ${formatDay(forecastDay.dt)}
              <br />
              <span id="day+1">
				  <img src="images/icons/${forecastDay.weather[0].icon}.svg" alt="">
				  Max ${Math.round(forecastDay.temp.max)} ° 
          <br>
          Min ${Math.round(forecastDay.temp.min)} °
			  </span>
            </h5>
            </div>
    `;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

//convert temp

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureC = document.querySelector("#displayed-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureC.innerHTML = Math.round(celsiusTemp);
}

let celsiusLink = document.querySelector("#change-to-C");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureF = document.querySelector("#displayed-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
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

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = `17e48d0a69e4a55c080a86ff5a2172bd`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForcast5Day);
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

  getForcast(response.data.coord);
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

searchCity("London");
