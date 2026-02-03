const apiKey = "58f1980f28364a52b64143307260302";

function handleKey(event) {
  if (event.key === "Enter") {
    getWeather();
  }
}

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const error = document.getElementById("error");

  error.innerText = "";

  if (city === "") {
    error.innerText = "Please enter a city name";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        error.innerText = "City not found";
        return;
      }

      document.getElementById("city").innerText =
        `${data.location.name}, ${data.location.country}`;

      document.getElementById("temp").innerText =
        `🌡 Temperature: ${data.current.temp_c} °C`;

      document.getElementById("condition").innerText =
        `☁ Condition: ${data.current.condition.text}`;

      document.getElementById("humidity").innerText =
        `💧 Humidity: ${data.current.humidity}%`;

      document.getElementById("wind").innerText =
        `💨 Wind Speed: ${data.current.wind_kph} km/h`;

      document.getElementById("icon").src =
        `https:${data.current.condition.icon}`;
    })
    .catch(() => {
      error.innerText = "Network error. Try again.";
    });
}
