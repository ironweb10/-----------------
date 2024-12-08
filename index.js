require('dotenv').config();
const nconf = require('nconf').argv().env().file({ file: './config/config.json' });
const express = require("express");
const { spawn } = require("child_process");
const WebhookClientWrapper = require('./utils/webhookClient');

const updatePlaylists = require('./structs/playlist-updater');
const axios = require("axios");
const chalk = require('chalk');

const app = express();
const port = 8080;

let webhookClient;
try {
  webhookClient = new WebhookClientWrapper();  
} catch (error) {
  console.error(chalk.red('Error initializing webhook client: '), error);
  process.exit(1);  
}

updatePlaylists();

const executeScript = (scriptName, scriptArgs = []) => {
  const script = spawn("node", [scriptName, ...scriptArgs]);

  script.stdout.on("data", (data) => {
    const logMessage = data.toString();
    if (logMessage.includes('[DISCORD]')) {
      console.log(chalk.blue(logMessage)); 
    } else {
      console.log(chalk.green(logMessage)); 
    }
  });

  script.stderr.on("data", (data) => {
    console.error(chalk.red(`Error --> ${data}`));
  });

  script.on("close", (code) => {
    if (code === 0) {
      console.log(`Lobbybot finished with code ${code}`);
    } else {
      console.log(chalk.yellow(`Restarting Lobby Bot...`));
      executeScript(scriptName, scriptArgs);  
    }
  });
};

executeScript("structs/lobbybot.js");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
