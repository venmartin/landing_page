// DOM Elements

const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const userName = document.getElementById('name');
const focus = document.getElementById('focus');

// Option for AM or PM

const showAMorPM = true;

// This is to display the current time.

function currentTime() {
  let today = new Date(),
   hour = today.getHours(),
   mins = today.getMinutes(),
   secs = today.getSeconds();

   // This will set AM or PM

   const amPm = hour >= 12 ? 'PM' : 'AM';

   // 12hr format
   hour = hour % 12 || 12;

   // Output the time

   time.innerHTML = `${hour}<span>:</span>${addZero(mins)}<span>:</span>${addZero(secs)} ${showAMorPM ? amPm : ''}`;

   setTimeout(currentTime, 1000);
}

// Function to add zero's to the minutes and seconds in single digits.

function addZero(num) {
  return (parseInt(num, 10) < 10 ? '0' : '') + num;
}

// Set the background and greeting to the time of day.

function setBgGreeting () {
  let today = new Date(),
    hour = today.getHours();

    if(hour < 12) {
      // Morning
      // document.body.style.backgroundImage = "url('../img/morning.jpg')";
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?sunrise')";
      
      greeting.textContent = 'Good Morning';
    } else if (hour < 18) {
      // Afternoon
      // document.body.style.backgroundImage = "url('../img/afternoon.jpg')";
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?afternoon,landscape')";      
      greeting.textContent = 'Good Afternoon'; 
      document.body.style.color = 'white';
      
    } else {
      
      // Evening
      // document.body.style.backgroundImage = "url('../img/evening.jpg')";
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?night')";
      greeting.textContent = 'Good Evening';
      document.body.style.color = 'white';
    }
}

// Get the name of user

function getName () {
  if(localStorage.getItem('userName') === null) {
    userName.textContent = "[Enter Your Name]";
  } else {
    userName.textContent = localStorage.getItem('userName');
  }
  // userName.textContent = "Name"
}


// Set the name of the user

function setName(e) {
  if (e.type === 'keypress') {
    // Check if ENTER is pressed.
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('userName', e.target.innerText);
      userName.blur();
    }
  } else {
    localStorage.setItem('userName', e.target.innerText)
  }

}

function getFocus () {
  if(localStorage.getItem('focus') === null) {
    focus.textContent = "[Enter Your Focus]";
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    // Check if ENTER is pressed.
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText)
  }

}


// Listeners

userName.addEventListener('keypress', setName);
userName.addEventListener('blur', setName);
// focus.addEventListener('keypress', setFocus);
// focus.addEventListener('blur', setFocus);

/*

https://api.openweathermap.org/data/2.5/weather?q=Sydney&units=metric&appid=7b069d76e3865c86d3513410c18a4226

*/

let weather = {
  apiKey: "7b069d76e3865c86d3513410c18a4226",
  fetchWeather: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="
       + city
       + "&units=metric&appid=" 
       + this.apiKey
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
      const { name } = data;
      const { country } = data.sys;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      
      document.querySelector('.city').innerText = `Weather in ${name}, ${country}`;
      document.querySelector('.icon').src = `https://openweathermap.org/img/w/${icon}.png`
      document.querySelector('.description').innerText = description;
      document.querySelector('.temp').innerText = `${Math.round(temp)}°C`;
      document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
      document.querySelector('.wind').innerText = `Wind Speed: ${speed}km/h`;
      document.querySelector('.weather').classList.remove('loading');
      // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?city%20of%20" + name + "')";
      document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;
      
    },
    search: function () {
      this.fetchWeather(document.querySelector('.search-box').value);
    },
};
document
  .querySelector('.searchbtn')
  .addEventListener('click', function () {
    let inputShape = document.querySelector('.card');
    inputShape.classList.add('card-ani');
    inputShape.classList.remove('.card');
    let emptyBox = document.querySelector('input');
      emptyBox.innerHTML = '';
      weather.search();
  });

  document.querySelector('.search-box').addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
      let inputShape = document.querySelector('.card');
      inputShape.classList.add('card-ani');
      inputShape.classList.remove('.card');
      let emptyBox = document.querySelector('input');
      emptyBox.innerText = '';
      weather.search();
      
    }
    
  })



// Run the app
// weather.fetchWeather('Sydney');
currentTime();
setBgGreeting();
getName();
