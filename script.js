let weather = {
    fetchWeather: function (location) {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=e7e979ec86d11d63b4bceafd2d42cea1&units=imperial", {mode:'cors'})
        .then((response) => {
            if(!response.ok){
                alert("No weather found.");
                throw new Error ("No weather found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { dt } = data;
      const { sunrise } = data.sys;
      const { sunset } = data.sys;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind; 
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".time").innerText = buildDate(dt);
      document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°F";
      document.querySelector(".humidity").innerText = "Humidty: " + humidity + "%";
      document.querySelector(".speed").innerText = "Wind speed: " + speed + " k/h";
      document.querySelector(".sunrise").innerText = buildDate(sunrise);
      document.querySelector(".sunset").innerText = buildDate(sunset);
    },
    search: function() {
        this.fetchWeather(document.querySelector(".searchBar").value);
    }
};

document.querySelector(".search button").addEventListener('click', function() {
    weather.search();
});

document.querySelector(".searchBar").addEventListener('keyup', function(e) {
    if (e.key == "Enter"){
        weather.search();
    }
});

function buildDate(d){
    let date = new Date(d * 1000);
    return date.toLocaleString();
}

weather.fetchWeather('Seattle');