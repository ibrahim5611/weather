/* Add to weather_prediction_app/static/weather_prediction_app/script.js */

let currentUnit = 'C';
let currentTemperatureCelsius;


function capitalizeDescription(description) {
    return description.replace(/\b\w/g, char => char.toUpperCase());
}

function getWeather() {
    const city = document.getElementById('city-input').value;
    fetch(`/weather/get_weather/?city=${city}`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = '';

            document.getElementById('weather-location').textContent = `Weather in ${data.name}`;
            document.getElementById('precipitation').textContent = `Precipitation: ${data.clouds.all} %`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity} %`;
            document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById('wind-direction').textContent = `Wind Direction: ${data.wind.deg}° ${convertDegreesToDirection(data.wind.deg)}`;
            
            const description = data.weather[0].description;
            const capitalizedDescription = capitalizeDescription(description);
            document.getElementById('description').textContent = `Description: ${capitalizedDescription}`;

            // Display the temperature
            currentTemperatureCelsius = data.main.temp;
            updateTemperatureDisplay();

            // Show the Maps button
            document.getElementById('toggle-map-btn').style.display = 'inline-block';
            
            // Initialize the map with the new data
            window.lat = data.coord.lat;
            window.lon = data.coord.lon;
            initMap(window.lat, window.lon);
        })
        .catch(error => console.error('Error:', error));
}

function updateTemperatureDisplay() {
    const temperatureDisplay = document.getElementById('temperature-value');
    const unitToggle = document.getElementById('unit-toggle');

    let temperature;
    if (currentUnit === 'C') {
        temperature = currentTemperatureCelsius;
        unitToggle.textContent = '°C';
    } else if (currentUnit === 'F') {
        temperature = (currentTemperatureCelsius * 9/5) + 32;
        unitToggle.textContent = '°F';
    } else if (currentUnit === 'K') {
        temperature = currentTemperatureCelsius + 273.15;
        unitToggle.textContent = 'K';
    }

    temperatureDisplay.textContent = temperature.toFixed(2);
}

function toggleTemperatureUnit() {
    if (currentUnit === 'C') {
        currentUnit = 'F';
    } else if (currentUnit === 'F') {
        currentUnit = 'K';
    } else {
        currentUnit = 'C';
    }
    updateTemperatureDisplay();
}

function convertDegreesToDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function toggleMap() {
    const map = document.getElementById('map');
    if (map.style.display === 'none' || map.style.display === '') {
        map.style.display = 'block';
        initMap(window.lat, window.lon); // Re-initialize the map if shown
    } else {
        map.style.display = 'none';
    }
}

function initMap(lat, lon) {
    const mapOptions = {
        center: new google.maps.LatLng(lat, lon),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const defaultViewBtn = document.createElement('button');
    defaultViewBtn.textContent = 'Default View';
    defaultViewBtn.onclick = () => map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(defaultViewBtn);

    const satelliteViewBtn = document.createElement('button');
    satelliteViewBtn.textContent = 'Satellite View';
    satelliteViewBtn.onclick = () => map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(satelliteViewBtn);

    const terrainViewBtn = document.createElement('button');
    terrainViewBtn.textContent = 'Terrain View';
    terrainViewBtn.onclick = () => map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(terrainViewBtn);
}
