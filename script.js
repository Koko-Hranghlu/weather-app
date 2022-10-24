const input = document.getElementById("input");
const submitBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-search-btn");
const time = document.getElementById("time");
const accessKey = "b973e4e8f0f360eb0c5f3fbd675bb7c2";

const today = new Date();
time.innerText = `${today.getFullYear()}-${
  today.getMonth() + 1
}-${today.getDate()}`;

submitBtn.addEventListener("click", cityLocationWeather);
locationBtn.addEventListener("click", currentWeather);

/*IPlocation();
function IPlocation() {
  fetch("https://ipapi.co/json")
    .then((res) => res.json())
    .then((data) => {
      fetch(`https://ipinfo.io/${data.ip}/json?token=264789fb02f051`)
        .then((res) => res.json())
        .then((data) => {
          console.log(typeof data.loc);
          const coordinates = data.loc.split(",");
          const latitude = coordinates[0];
          const longitude = coordinates[1];
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${accessKey}`
          )
            .then((res) => res.json())
            .then((data) => updateContent(data));
        });
    });
}*/

// API request by city name
function cityLocationWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${accessKey}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod == "404") throw new Error(data.message);
      updateContent(data);
    })
    .catch((err) => alert(err.message));
}

// API request by user location
function currentWeather() {
  navigator.geolocation.getCurrentPosition(success, error);
  function success(pos) {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${accessKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => updateContent(data));
  }

  function error() {
    alert("device denied location access!");
  }
}

function updateContent(data) {
  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temperature").innerHTML = `${Math.round(
    data.main.temp
  )} &#8451;`;
  document.getElementById("sky").innerText = data.weather[0].main;
  document.getElementById("hum").innerText = data.main.humidity + "%";
}
