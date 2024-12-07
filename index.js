
require('dotenv').config();
const nconf = require('nconf').argv().env().file({ file: './config/config.json' });
const express = require("express");
const { initializeDiscordBot } = require('./handlers/discordHandler');
const { initializeFortniteBot } = require('./handlers/partyHandler');


const app = express();
const webhookClient = require('./utils/webhookClient');
const port = 8080;


initializeDiscordBot(nconf, webhookClient);
initializeFortniteBot(nconf, webhookClient);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    webhookClient.send('Bot started successfully.');
});
