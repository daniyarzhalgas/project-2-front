const apiKey = "80b846ef4c9cd642b628e6747c3360ec";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search .search-btn");
const locationSearchBtn = document.querySelector(".search .location-search-btn");
const switchTemp = document.querySelector(".search .switch-temp")
const weatherIcon = document.querySelector(".weather-icon");
let fahrenheitSymbol = '°F'
let celsiusSymbol = '°C'
let lat1 = 0;
let lon1 = 0;
async function checkWeather(lat,lon) {
    const now = new Date()
    document.querySelector(".date").innerHTML = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`;
    document.querySelector(".side-info .time").innerHTML = `${now.getHours() > 9 ? now.getHours() : '0' + now.getHours()}:${now.getMinutes() > 9 ? now.getMinutes() : '0' +now.getMinutes()}`
    lat1 = lat ;
    lon1 = lon;
   let urlWeather= `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
   let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
   fetch(urlWeather).then(res => res.json()).then(data => {
    document.querySelector(".error").style.display = "none";
        
    let temp =  data.main.temp
    let feels_like = data.main.feels_like;
    if(switchTemp.textContent == '°C'){
        temp = Math.round((temp * 9/5) + 32)  + '°F';
        feels_like = Math.round((feels_like * 9/5) +32) + '°F'; 
    }else{
         temp = Math.round(temp) + '°C'
         feels_like = Math.round(feels_like) + '°C';
    }
    
    console.log(data.main.feels_like);
    document.querySelector(".city").innerHTML =data.name;
    document.querySelector(".temp").innerHTML = temp;
    document.querySelector(".temp-aside").innerHTML = temp;
    document.querySelector(".feels-like").innerHTML= 'feels like '+feels_like;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =  data.wind.speed + " km/h";
    
    document.querySelectorAll(".weather-condition").innerHTML = data.weather[0].main;
    if(data.weather[0].main =="Clouds") {
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main =="Clear") {
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main =="Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main =="Mist") {
        weatherIcon.src = "images/mist.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src ="images/rain.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src ="images/snow.png";
    }
        
    document.querySelector(".weather").style.display ="block";
        
   });


   fetch(urlForecast).then(res => res.json()).then(data => {
    let uniqueForecast5Days = [];
    let fiveDaysForecast = data.list.filter(forecast => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if(!uniqueForecast5Days.includes(forecastDate)){
            return uniqueForecast5Days.push(forecastDate)
        }
    }) 
    // Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday
    days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    forecastDiv = document.querySelector(".forecast");
    forecastDiv.innerHTML = "";
    for(i = 0; i<fiveDaysForecast.length -1  ; i++){
        let date = new Date(fiveDaysForecast[i].dt_txt)
        let temp = Math.round(fiveDaysForecast[i].main.temp) - 273
        let min_temp  =Math.round(fiveDaysForecast[i].main.temp_min) - 273;
        let max_temp  =Math.round(fiveDaysForecast[i].main.temp_max) - 273;
        let condition = fiveDaysForecast[i].weather[0].main;

        if(switchTemp.textContent == '°C'){
            temp = Math.round((temp * 9/5) + 32)  + '°F'
            min_temp = Math.round((min_temp * 9/5) + 32)  + '°F'
            max_temp = Math.round((max_temp * 9/5) + 32)  + '°F'
        }else{
            temp =temp   + '°F'
            min_temp = min_temp  + '°C'
            max_temp = max_temp  + '°C'
        }
        forecastDiv.innerHTML += `
        <div class="item">${days[date.getDay()]}
            <!--<br>temp:${temp} -->
            <br>min:${min_temp}
            <br>max:${max_temp}
            <br>${condition}
            <br>
            <img class="icon-condition" src="images/${condition.toLowerCase()}.png">
        </div>
        `
    }
   });


   fetch(urlForecast).then(res => res.json()).then(data => {
    forecastHourly = document.querySelector(".hourly-forecast");
    console.log(data)

    forecastHourly.innerHTML ="";
    for(i = 0; i < 6;i++){
        let date = new Date(data.list[i].dt_txt)
        let time = `${date.getHours()}:00`;
        let temp = Math.round(data.list[i].main.temp )-273;
        let condition = data.list[i].weather[0].main;

        if(switchTemp.textContent == '°C'){
            temp = Math.round((temp * 9/5) + 32)  + '°F'
        }else{
            temp = Math.round(temp) + '°C'
        }
        forecastHourly.innerHTML += `
        <div class="forecast-hourly">
            ${time}
            <br>${temp}
            <br>${condition}
        </div>
        `
    }
   });

}

searchBox.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        let city = searchBox.value.trim();
        searchBox.value= "";
        let GEOCODING_API_URL =`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}&units=metric`
        fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
            let {name,lat,lon,country,state} =data[0];
            checkWeather(lat,lon);
        }).catch(() => {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none ";
            alert('Failed to fetch current weather');
        })
        
    }
})

locationSearchBtn.addEventListener("click", ()=> {
    navigator.geolocation.getCurrentPosition(success, error);
});

searchBtn.addEventListener("click", ()=>{
    if(searchBox.value != ""){    
        let city = searchBox.value.trim();
        searchBox.value= "";
        let GEOCODING_API_URL =`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}&units=metric`
        fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
            let {lat,lon} =data[0];
            checkWeather(lat,lon);
        }).catch(() => {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none ";
            alert('Failed to fetch current weather');
        })
    }else{
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none ";
        alert('Failed to fetch current weather');
    }
});


function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    checkWeather(latitude, longitude);
}
function error() {
    alert("Не удалось получить доступ к местоположению. Включите доступ к геолокации в настройках.");
}

switchTemp.addEventListener("click", ()=> {
    if(switchTemp.textContent == '°C'){
        checkWeather(lat1,lon1);
        switchTemp.innerHTML = '°F'
    }else{
        checkWeather(lat1,lon1);
        switchTemp.innerHTML = '°C'
    }
})
navigator.geolocation.getCurrentPosition(success, error);



document.getElementById('search-input').addEventListener('input', async function() {
    const query = this.value.trim();
    console.log(query);
    if (query.length > 2) { // Минимальная длина запроса для автоподсказки
        try { //http://api.geonames.org/postalCodeSearchJSON?name_startsWith=${query}&postalcode=9011&maxRows=10&username=daniyarrrr
            const response = await fetch(`http://api.geonames.org/postalCodeSearchJSON?name_startsWith=${query}&postalcode=9011&maxRows=10&username=daniyarrrr`);
            const data = await response.json();
            
            console.log(data);
            displaySuggestions(data.geonames);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    } else {
        clearSuggestions();
    }
});

function displaySuggestions(cities) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; // Очистка предыдущих подсказок

    cities.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = `${city.name}, ${city.countryName}`;
        suggestionItem.classList.add('suggestion-item');

        suggestionItem.addEventListener('click', () => {
            document.getElementById('search-input').value = city.name;
            clearSuggestions();
            fetchWeather(city.name);
        });

        suggestionsContainer.appendChild(suggestionItem);
    });
}

function clearSuggestions() {
    document.getElementById('suggestions').innerHTML = '';
}
