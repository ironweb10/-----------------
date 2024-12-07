const { Client, Intents } = require('discord.js');

function initializeDiscordBot(config, webhookClient) {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

    client.once('ready', () => {
        console.log("[DISCORD] Bot online!");
        client.user.setActivity(config.get('discord:status'), { type: config.get('discord:status_type') });
    });

   
  
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        switch (interaction.commandName) {
            case 'status':
                interaction.reply('Bot is running.');
                break;
       
            default:
                interaction.reply('Unknown command.');
        }
    });

    if (config.get('discord:run_discord_client')) {
        client.login(process.env.DISCORD_TOKEN);
    } else {
        console.log("[DISCORD] Client disabled.");
    }
}

module.exports = { initializeDiscordBot };
