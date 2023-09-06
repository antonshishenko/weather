const apiKey = "e8c8c39abf2170cfcef671c622abad98";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=paris&appid=e8c8c39abf2170cfcef671c622abad98";


const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherIconElement = document.querySelector(".weather-icon");

function getWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case "Clear":
            return "img/clear.png";
        case "Rain":
            return "img/rain.png";
        case "Clouds":
            return "img/cloudly.png";
        case "Thunderstorm":
            return "img/dark-and-stormy.png";
        default:
            return "img/unknown.png";
    }
}

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
    document.querySelector(".wind").innerHTML = data.wind.speed + 'км/с';

    const weatherIcon = getWeatherIcon(data.weather[0].main);
    weatherIconElement.src = weatherIcon;
}


searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        checkWeather(city);
    }
});


cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value;
        if (city) {
            checkWeather(city);
        }
    }
});

checkWeather("Москва");