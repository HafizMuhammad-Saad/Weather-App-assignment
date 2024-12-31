const cityInputEle = document.getElementById('city');

async function checkWeather() {
    event.preventDefault();
    try {
        if (cityInputEle.value.trim() !== '') {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEle.value}&appid=de0b7b903fe961855fdb0985a905afdb`
            let fetchWeather = await fetch(weatherUrl)
            // console.log(fetchWeather);
            
            if (!fetchWeather.ok && fetchWeather.statusText === 'Not Found') {
                alert('City not found')
            } else {
                let weatherJson = await fetchWeather.json()
                displayWeather(weatherJson)
                cityInputEle.value = ''
                
            }
        } else {
            alert('Please Enter any city name')
        }
    } catch (error) {
        console.log(error);
        
    }
}

function displayWeather(weatherData) {
    // console.log(weatherData);
    
  
    let weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    document.getElementById('weatherInfo').innerHTML = 
    `
          <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card weather-card" id="wrapper-bg">
          <div class="card-body">
            <div class="text-center">
              <img src="${weatherIconUrl}" alt="${weatherData.weather[0].description}" width="150px">
              <h3 class="card-title mt-2">${weatherData.name}, ${weatherData.sys.country}</h3>
              <p class="card-text text-muted">${weatherData.weather[0].description.toUpperCase()}</p>
              <h4 class="card-text highlight text-dark">${Math.floor(weatherData.main.temp - 273.15)}°C</h4>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-6">
                <ul class="list-group">
                  <li class="list-group-item"><strong>Humidity:</strong> ${weatherData.main.humidity}%</li>
                  <li class="list-group-item"><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</li>
                </ul>
              </div>
              <div class="col-sm-6">
                <ul class="list-group">
                  <li class="list-group-item"><strong>Pressure:</strong> ${weatherData.main.pressure} hPa</li>
                  <!-- <li class="list-group-item"><strong>Coordinates:</strong> ${weatherData.coord.lat}, ${weatherData.coord.lon}</li> -->
                  <li class="list-group-item"><strong>Real Feel:</strong> ${Math.floor(weatherData.main.feels_like - 273.15)}</li>
                </ul>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-6">
                <p class="text-light"><strong>Sunrise:</strong> ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
              </div>
              <div class="col-sm-6">
                <p class="text-light"><strong>Sunset:</strong> ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    `
    
let main = weatherData.weather[0].main;
let weatherCard = document.getElementById('wrapper-bg');
weatherCard.style.backgroundPosition = 'center';
weatherCard.style.backgroundSize = 'cover';
weatherCard.style.backgroundSize = 'cover';
   
// Backgrounds
switch (main) {
  case "Snow":
  document.getElementById("wrapper-bg").style.backgroundImage =
  "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
  break;
  case "Clouds":
  document.getElementById("wrapper-bg").style.backgroundImage =
  "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
  break;
  case "Fog":
  document.getElementById("wrapper-bg").style.backgroundImage =
  "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
  break;
  case "Rain":
  document.getElementById("wrapper-bg").style.backgroundImage =
  "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
  break;
  case "Clear":
  document.getElementById("wrapper-bg").style.backgroundImage =
  "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
  break;
  case "Thunderstorm":
  document.getElementById("wrapper-bg").style.backgroundImage =
  "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
  break;
  default:
  document.getElementById("wrapper-bg").style.backgroundImage =
  "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
  break;
  }


  
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=de0b7b903fe961855fdb0985a905afdb`
  fetch(weatherUrl)
  .then(response => response.json())
  .then(data => displayWeather(data))
  .catch(error => console.log('Error:', error));
  }

// window.onload = getLocation;

const loader = function() {

  document.getElementById('loader').style.display = 'block';
  document.getElementById('main-content').style.display = 'none';
}
setTimeout(() => {
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('loader').style.display = 'none';
  getLocation()
}, 6000);

window.onload = loader;