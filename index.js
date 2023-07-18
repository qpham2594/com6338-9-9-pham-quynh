// Your code here
// all constiables needed, moved most constiables out as global constiables

const weatherSearch = document.getElementById('weather')
const lineBreak = document.createElement('br')
const cityAndCountry = document.createElement('h2')
const coordinateLink = document.createElement('a');
const weatherImg = document.createElement('img')
const condition = document.createElement('p')
const current = document.createElement('p')
const feelsLike = document.createElement('p')
const updatedTime = document.createElement('p')
const locationNotFound = document.createElement('h2');

const weatherForm = document.querySelector('form');
weatherForm.onsubmit = async function(e) {
    e.preventDefault()
    const searchTerm = this.search.value.trim();
    if (!searchTerm || /^\s*$/.test(searchTerm)) {
        return;
    }

    const apiKey = '?units=imperial&appid=aa3f1ef4a1b7d2080dc5d3357ddcaaa0&q=';
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather${apiKey}${searchTerm}`)
        const weatherData = await res.json()

        if (weatherData.error) {
            throw new Error('Location Not Found');
          }
        locationData(weatherData)
        
    } 
    catch(err) {
        weatherSearch.innerHTML = ''
        weatherForm.search.value = ''
        locationNotFound.innerHTML = "Location Not Found";
        weatherSearch.appendChild(locationNotFound);
        };
}



const locationData = ({

    name,
    sys: {country},
    weather: [{description,icon}],
    main: { temp, feels_like},
    coord: {lon,lat},
    dt
}) => {
    console.log(weather)
    weatherForm.search.value = ''
    weatherSearch.innerHTML = ''

    cityAndCountry.innerHTML = `<h2> ${name}, ${country} </h2>`
    weatherSearch.appendChild(cityAndCountry)

    coordinateLink.innerHTML = "Click to view map";
    coordinateLink.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    coordinateLink.target = "_blank";
    weatherSearch.appendChild(coordinateLink)

    const weatherImgLink = 'https://openweathermap.org/img/wn/'
    weatherImg.src = `${weatherImgLink}${icon}@2x.png`
    weatherSearch.appendChild(lineBreak)
    weatherSearch.appendChild(weatherImg)

    condition.innerHTML = description
        .split(' ') // Split the description into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and lowercase the rest
        .join(' '); // Join the words back into a single string with spaces
    weatherSearch.appendChild(condition)

    weatherSearch.appendChild(lineBreak)

    current.innerHTML = `Current: ${temp}°F`;
    weatherSearch.appendChild(current)

    feelsLike.innerHTML = `Feels Like: ${feels_like}°F`;
    weatherSearch.appendChild(feelsLike)

    weatherSearch.appendChild(lineBreak)

    
    const date = new Date(dt * 1000);
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
    updatedTime.innerHTML = `Last Updated: ${timeString}`;
    weatherSearch.appendChild(updatedTime)

}


// function to display data on DOM
/*
function locationData(weather) {
        console.log(weather)
        weatherSearch.innerHTML = ''
        weatherForm.search.value = ''
        // reset after each submission
        // without the ? after sys, there was a TypeError message in console?

        cityAndCountry.innerHTML = weather.name + ", " + weather.sys?.country ;
        console.log(cityAndCountry)
        weatherSearch.appendChild(cityAndCountry)

       //attempted to create one constiable with both lat and lon and combined everything in <a href > with "target_BLANK" inside but did not pass test
       //then split everything up and set attribute separately
        const latitude = weather.coord?.lat;
        const longitude = weather.coord?.lon;
        coordinateLink.textContent = "Click to view map";
        coordinateLink.href = 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude;
        coordinateLink.setAttribute('target', '_blank');
        weatherSearch.appendChild(coordinateLink)
        
      // initially used icons URLs, set an array, then use if statement to detect key words in weather.main[0]
      // the above way worked, but did not pass the last test - possibly due to all the URL links
      // split everything up and combined with weatherImg.src instead 
        const weatherImgCode = weather.weather[0].icon
        const weatherImgLink = 'https://openweathermap.org/img/wn/'
        weatherImg.src = weatherImgLink + weatherImgCode + '@2x.png'
        weatherSearch.appendChild(lineBreak)
        weatherSearch.appendChild(weatherImg)

    // split the word into array to capitalize the first letter and lowercase letters for the rest, then rejoin 
        condition.innerHTML = weather.weather[0].description
        .split(' ') // Split the description into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and lowercase the rest
        .join(' '); // Join the words back into a single string with spaces
        weatherSearch.appendChild(condition)

        weatherSearch.appendChild(lineBreak)

        
        current.innerHTML = "Current: " + weather.main?.temp + " °F";
        weatherSearch.appendChild(current)

       
        feelsLike.innerHTML = "Feels Like: " + weather.main?.feels_like + " °F";
        weatherSearch.appendChild(feelsLike)

        weatherSearch.appendChild(lineBreak)

        // Using the instruction and example from the page
        const milliseconds = weather.dt * 1000;
        const date = new Date(milliseconds); // Create a new Date object with the current time
        const timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });

        updatedTime.innerHTML = "Last Updated: " + timeString;
        weatherSearch.appendChild(updatedTime)
}
*/

