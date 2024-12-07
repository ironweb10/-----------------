const handleHelpCommand = async (message, sender) => {
    console.log(`${sender.displayName}: ${message.content}`);
    const [command] = message.content.split(' ');
    
    if (command === '!help') {
        const helpMessage = "Available commands:\n" +
            "- !ai <prompt>: Get AI response to the provided prompt.\n" +
            "- !help: Show this help message.\n" +
            "- !youtube <search term>: Search for videos on YouTube." +
                "- !ping: Check the bot's latency.\n" +
                "- !weather <city>: Get the current weather for a specified city.\n";
        message.reply(helpMessage);
    }
};

module.exports = handleHelpCommand;
