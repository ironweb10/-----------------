

const axios = require('axios');

const handleAICommand = async (message, sender) => {
    console.log(`${sender.displayName}: ${message.content}`);
    const [command, query] = message.content.split(' ');

    if (command === '!ai' && query) { 
        const content = query.toLowerCase();

        try {
            const apiUrl = `https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(content)}`;
            const response = await axios.get(apiUrl);
            console.log('API Response:', response.data);
            const apiResponse = response.data && response.data.response;
            console.log('Extracted API Response:', apiResponse);
            message.reply(apiResponse || 'API response is empty or undefined.');
        } catch (apiError) {
            console.log('API Error:', apiError);
            message.reply('Failed to fetch response from the AI API.');
        }
    } else if (command === '!ai' && !query) {
        message.reply('Please provide a prompt for the AI.');
    }
};

module.exports = handleAICommand;
