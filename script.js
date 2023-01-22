const input = document.querySelector('input'),
        button = document.querySelector('button'),
        errorMessage = document.querySelector('.error'),
        date = document.querySelector('.date'),
        cityName = document.querySelector('.city-name'),
        imgTemp = document.querySelector('.temp-img'),
        tempDescription = document.querySelector('.temp-description'),
        temperature = document.querySelector('.temp'),
        feelsTemp = document.querySelector('.temp-feels'),
        pressure = document.querySelector('.pressure'),
        humidity = document.querySelector('.humidity'),
        windSpeed = document.querySelector('.wind-speed'),
        mainTempDescription = document.querySelector('.main-temp-description'),
        weatherResponse =document.querySelector('.weather-response'),
        cloudLeft=document.querySelector('.cloud-left'),
        cloudRight=document.querySelector('.cloud-right'),
        checkWeatherBlock=document.querySelector('.check-weather'),
        backArrow=document.querySelector('.back-arrow')

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=c84c59d4d104a2550f66e46573ece2ed'
const apiUnit = '&units=metric'
const apiLang = '&lang=pl'

const checkWeather = () => {
    let cityFound=true
    const apiCity = input.value
    const URL = apiLink + apiCity + apiKey + apiUnit + apiLang

    axios.get(URL).then((res) => {
        const data = res.data
        console.log(res.data)

        date.textContent = `${new Date().toString().slice(0,21)}`
        cityName.textContent = `${data.name}, ${data.sys.country}`
        tempDescription.textContent = `${data.weather[0].description}`
        imgTemp.src =`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        imgTemp.alt = `${data.weather[0].description}`
        temperature.textContent = `${Math.floor(data.main.temp)} °C`
        pressure.textContent = `${data.main.pressure} hPa`
        humidity.textContent = `${data.main.humidity} %`
        windSpeed.textContent = `${data.wind.speed} m/s`
        feelsTemp.textContent = `${Math.floor(data.main.feels_like)} °C`
        errorMessage.textContent = ''
    }).catch(error => {
        if(error) {
            errorMessage.textContent = 'City is not found'
            cityFound=false
            console.log(cityFound)
        }
        [cityName, temperature, date, tempDescription, pressure, humidity, windSpeed, date, feelsTemp].forEach(el => {
            el.textContent = ''
        })
        
        imgTemp.src = ''
        imgTemp.alt = ''

    }).finally(() => {
        if(cityFound===true){
            mainTempDescription.style.display="flex";
            weatherResponse.style.display="flex";
            cloudLeft.style.display="none";
            cloudRight.style.display="none";
            checkWeatherBlock.style.display="none";
            backArrow.style.display="flex";
        }
        
        input.value = ''
    })

}

button.addEventListener('click', checkWeather)
backArrow.addEventListener('click',()=>{
    mainTempDescription.style.display="none";
    weatherResponse.style.display="none";
    cloudLeft.style.display="flex";
    cloudRight.style.display="flex";
    checkWeatherBlock.style.display="flex";
    backArrow.style.display="none";
})

