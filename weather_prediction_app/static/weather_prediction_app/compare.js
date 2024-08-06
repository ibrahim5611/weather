// compare.js
function compareWeather() {
    const place1 = document.getElementById('place1-input').value;
    const place2 = document.getElementById('place2-input').value;
    fetch(`/compare_weather/?place1=${place1}&place2=${place2}`)
        .then(response => response.json())
        .then(data => {
            displayWeatherInfo1(data.place1);
            displayWeatherInfo2(data.place2);
        })
        .catch(error => console.error('Error:', error));
}

function displayWeatherInfo1(weatherData) {
    const weatherInfo1 = document.getElementById('weather-info1');
    weatherInfo1.innerHTML = `
        <h2>Weather ${weatherData.place} </h2>
        <p>Temperature: ${weatherData.temperature} °C</p>
        <p>Precipitation: ${weatherData.precipitation}%</p>
        <p>Humidity: ${weatherData.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind_speed} m/s</p>
        <p>Wind Direction: ${weatherData.wind_direction} (${weatherData.wind_degrees}°)</p>
        <p>Description: ${capitalizeDescription(weatherData.description)}</p>
    `;
}

function displayWeatherInfo2(weatherData) {
    const weatherInfo2 = document.getElementById('weather-info2');
    weatherInfo2.innerHTML = `
        <h2>Weather ${weatherData.place} </h2>
        <p>Temperature: ${weatherData.temperature} °C</p>
        <p>Precipitation: ${weatherData.precipitation}%</p>
        <p>Humidity: ${weatherData.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind_speed} m/s</p>
        <p>Wind Direction: ${weatherData.wind_direction} (${weatherData.wind_degrees}°)</p>
        <p>Description: ${capitalizeDescription(weatherData.description)}</p>
    `;
}

function capitalizeDescription(description) {
    return description.replace(/\b\w/g, char => char.toUpperCase());
}

