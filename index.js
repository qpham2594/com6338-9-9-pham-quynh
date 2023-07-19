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
    // use await fetch to retrieve information from API
    // use try and catch to catch the error
    const apiKey = '?units=imperial&appid=aa3f1ef4a1b7d2080dc5d3357ddcaaa0&q=';
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather${apiKey}${searchTerm}`)
        const weatherData = await res.json()

        if (weatherData.error) {
            throw new Error('Location Not Found');
          } 
        locationData(weatherData)
        
    } // atttempted locationNotFound.innerHTML = err.message but does not pass the test
    catch(err) {
        weatherSearch.innerHTML = ''
        weatherForm.search.value = ''
        locationNotFound.innerHTML = 'Location Not Found';
        weatherSearch.appendChild(locationNotFound);
        };
}
// clear out the search value and the form in catch block
// in previous assignment, we didn't have to clear weatherSearch above, but here, we have to


// defined const locationData with information from the data and used it to form a function
// using the arrow to define function from the constant
// instead of using weather.main.name, we can use ${} and insert the data name we have when we define the const
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
    coordinateLink.target = "_blank"; //instead of setAttribute, we can directly set it up like such
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

} // using ${} will save time and shorten the code, also making it easier to keep track of

