let weather = {
    apikey: "c9ab0ee4eb68ddf011186dbf12920205",
    fetchWeather : function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apikey)
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data));
    },

    handleApiError: function (error) {
        
        const errorMessage = "An error occurred while fetching weather data. Please try again later.";
        alert(errorMessage);
        console.error(error); 
    },


    displayWeather: function(data) {
        if (data.cod === "404") {
            alert("City not found. Please enter a valid city name.");
        } else {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".description").innerText = description;
            document.querySelector(".temp").innerText = temp + "°C";
            document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
            document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
            document.querySelector(".weather").classList.remove("loading");
            
        }
    },

    getUserLocation: function () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.fetchWeatherByCoords(latitude, longitude);
            });
        } else {
            alert("Geolocation is not available in your browser.");
        }
    },

    fetchWeatherByCoords: function (latitude, longitude) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&units=metric&appid=" +
            this.apikey
        )
            .then((Response) => Response.json())
            .then((data) => this.displayWeather(data));
    },

    search : function() {
        this.fetchWeather(document.querySelector(".searchbar").value);
        const city = document.querySelector(".searchbar").value;
        if (city) {
            this.fetchWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("hyderabad");