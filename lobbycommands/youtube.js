const axios = require('axios');

const handleYoutubeCommand = async (message, sender) => {
    console.log(`${sender.displayName}: ${message.content}`);
    const [command, query] = message.content.split(' ');

    if (command === '!youtube' && query) { 
        try {
                const apiKey = 'AIzaSyBfTw24MZHpsZQWNzHjK9EGPHPPIHLKO5k';
            const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(query)}&key=${apiKey}`;
            const response = await axios.get(apiUrl);

            if (response.data.items && response.data.items.length > 0) {
                let replyMessage = 'Search results on YouTube:\n';
                response.data.items.forEach((item, index) => {
                    replyMessage += `${index + 1}. ${item.snippet.title} - https://www.youtube.com/watch?v=${item.id.videoId}\n`;
                });

                message.reply(replyMessage);
            } else {
                message.reply('No results found for the YouTube search.');
            }
        } catch (error) {
            console.error('Error searching on YouTube:', error);
            message.reply('An error occurred while searching on YouTube. Please try again later.');
        }
    } else if (command === '!youtube' && !query) { 
        message.reply('Please provide a search term to search on YouTube.');
    }
};

module.exports = handleYoutubeCommand;