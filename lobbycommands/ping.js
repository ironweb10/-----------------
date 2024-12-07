

const handlePingCommand = async (message, sender) => {
    console.log(`${sender.displayName}: ${message.content}`);

    const [command, query] = message.content.split(' ');

    if (command === '!ping' && !query) {
        const ping = Date.now() - message.createdTimestamp;
        message.reply(`Pong! Latency is ${ping}ms.`);
    } else {
        
    }
};

module.exports = handlePingCommand;
