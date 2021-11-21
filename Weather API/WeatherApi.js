window.addEventListener('load', () =>{
    let longtitude;
    let latitude;
    const temperatureDescription = document.querySelector(".description");
    const maxTemp = document.querySelector(".max-temperature");
    const minTemp = document.querySelector(".min-temperature");
    const humidityp = document.querySelector(".humidity");
    const pressurePa = document.querySelector(".pressure");
    const temperature = document.querySelector(".degree");
    const timeZone = document.querySelector(".location-timezone");
    const wicon = document.querySelector('.icony');
    const changer = document.querySelector(".example_a");
    const unit = document.getElementById("unit");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(coordinates =>{
            latitude = coordinates.coords.latitude;
            longtitude = coordinates.coords.longitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=7cee3d6581f24442a3a1fc0bf0952617`;
        fetch(api)
        .then(response=>{
            return response.json();
        })   
        .then(data =>{
            console.log(data);
           const {temp, humidity, pressure, temp_max, temp_min} = data.main;
            temperature.textContent = `${Math.round(temp * 100) / 100}°`;
            pressurePa.textContent = `Pressure is ${pressure} Pa`;
            humidityp.textContent =`Humidity is ${humidity}%` ;
            maxTemp.textContent = `Max temperature is ${Math.round(temp_max * 100) / 100}°`;
            minTemp.textContent = `Min temperature is ${Math.round(temp_min * 100) / 100}°`;
            temperatureDescription.textContent = data.weather[0].description;
            timeZone.textContent= `${data.name}/${data.sys.country}`;
            //const {icon} = data.weather[0].icon;
            //wicon.src = `icons/${data.weather[0].icon}.png`;
            wicon.setAttribute("src",`icons/${data.weather[0].icon}.png`);

            changer.addEventListener("click", ()=>{
                if(unit.textContent === "K"){
                    unit.textContent = "C";
                    maxTemp.textContent = `Max temperature is ${temp_max - 273.15}°`;
                    minTemp.textContent = `Min temperature is ${temp_min - 273.15}°`;
                    temperature.textContent = `${temp -  273.15}°`;
                    changer.textContent = "Click here for Kelvin";
                }
                else{
                    unit.textContent = "K";
                    changer.textContent = "Click here for Celcius";
                    temperature.textContent = `${temp.toFixed(2)}°`;
                    maxTemp.textContent = `Max temperature is ${temp_max.toFixed(2)}°`;
            minTemp.textContent = `Min temperature is ${temp_min.toFixed(2)}°`;
                }
                
      
          })
        })
        })
    }else{
        alert("Hey, please allow location");
    }
    

})
