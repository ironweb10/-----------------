// commands/weather.js

const axios = require('axios');

const API_KEY = 'd352cb5be6dd477cb63113614242904'; 
const handleWeatherCommand = async (message, sender) => {
    console.log(`${sender.displayName}: ${message.content}`);

   
    if (!message.content.startsWith('!weather')) {
        return; 
    }

  
    const [, city] = message.content.split(' ');

    if (!city) {
        message.reply('Please provide the name of a city to get the weather forecast.');
        return;
    }

    try {
       
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`);

      
        const weatherData = response.data;
        const temperature = weatherData.current.temp_c;
        const weatherDescription = weatherData.current.condition.text;
        const cityName = weatherData.location.name;
        const country = weatherData.location.country;

   
        const replyMessage = `The weather in ${cityName}, ${country} is ${weatherDescription} with a temperature of ${temperature}°C.`;

        
        message.reply(replyMessage);
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        message.reply('An error occurred while fetching the weather forecast. Please try again later.');
    }
};

module.exports = handleWeatherCommand;