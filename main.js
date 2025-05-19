let key = "a58345b44d0db3966286b77acc10c775";
let url = "https://api.openweathermap.org/data/2.5/weather";

    let convertTime = function(eTime) {
        let date = new Date(eTime * 1000);
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        hours = hours === 0 ? 12 : hours;
        let am_pm = date.getHours() >= 12 ? "PM" : "AM";
        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let time = hours + ":" + minutes + " " + am_pm;
        return time;
    }

    let kTOC = function(kTemp) {
        return (kTemp - 273.15).toFixed(2);
    }

    let windDirection = function(d) {
        if (11.25 <= d && d < 33.75) return "NNE";
        else if (33.75 <= d && d < 56.25) return "NE";
        else if (56.25 <= d && d < 78.75) return "ENE";
        else if (78.75 <= d && d < 101.25) return "E";
        else if (101.25 <= d && d < 123.75) return "ESE";
        else if (123.75 <= d && d < 146.25) return "SE";
        else if (146.25 <= d && d < 168.75) return "SSE";
        else if (168.75 <= d && d < 191.25) return "S";
        else if (191.25 <= d && d < 213.75) return "SSW";
        else if (213.75 <= d && d < 236.25) return "SW";
        else if (236.25 <= d && d < 258.75) return "WSW";
        else if (258.75 <= d && d < 281.25) return "W";
        else if (281.25 <= d && d < 303.75) return "WNW";
        else if (303.75 <= d && d < 326.25) return "NW";
        else if (326.25 <= d && d < 348.75) return "NNW";
        else return "N";
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let fullUrl = url + "?lat=" + lat + "&lon=" + long + "&appid=" + key;

        fetch(fullUrl)
            .then(function(response) {
                console.log("Response: ", response);
                return response.json();
            })
            .then(function(weather) {
                displayWeather(weather);
            });
    });

    let displayWeather = function(weather) {
        let city = weather.name;
        let sunrise = weather.sys.sunrise;
        let sunset = weather.sys.sunset;
        let currentTemp = weather.main.feels_like;
        let highTemp = weather.main.temp_max;
        let lowTemp = weather.main.temp_min;
        let description = weather.weather[0].description;
        let windDir = weather.wind.deg;
        let windSpeed = weather.wind.speed;

        let output = "<h1>" + city + " Current Conditions</h1>";
        output += "<div id='conditions'><h2>" + kTOC(currentTemp) + "&#8451;</h2>";
        output += "<h3>" + description.charAt(0).toUpperCase() + description.slice(1) + "</h3>";
        output += "<h3>High Today: " + kTOC(highTemp) + "&#8451;</h3>";
        output += "<h3>Low Today: " + kTOC(lowTemp) + "&#8451;</h3>";
        output += "<div id='wind'><h3>Wind: " + windDirection(windDir) + " at " + Math.round(windSpeed * 3.6) + " KMPH</h3>";
        output += "<h3>Sunrise: " + convertTime(sunrise) + "</h3>";
        output += "<h3>Sunset: " + convertTime(sunset) + "</h3>";
        output += "</div></div>";

        document.getElementById('weather').innerHTML = output;
    }