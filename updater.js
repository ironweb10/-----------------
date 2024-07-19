const fetch = require('node-fetch');
const fs = require('fs');
const key = process.env['API_KEY'];
const v = process.env['version'];

async function update() {
  try {
    // send api request to update main.js
    const mainResponse = await fetch(`https://nextdroopyinstances.imsocool098665.repl.co/api/v2/calculate/useragent`);
    const mainCode = await mainResponse.text();

    // Handle response for main.js update
    console.log("Attempting to update: main.js");
    const formattedMainCode = mainCode.trim();
    if (formattedMainCode.includes("Invalid API key")) {
      console.log("INVALID API KEY PROVIDED!");
      process.exit(28);
    } else if (formattedMainCode.includes("server")) {
      console.log("API returned an error, please try again later.");
      process.exit(1);
    }

    // Write the code to a JavaScript file
    fs.writeFileSync('main.js', formattedMainCode);
    console.log("File: main.js has been updated!");

    // send api request to update config
    const configResponse = await fetch(`https://nextdroopyinstances.imsocool098665.repl.co/api/public/config`);
    const config = await configResponse.text();

    // Handle response for config update
    console.log("Attempting to update: config.json");
    const formattedConfig = config.trim();
    if (formattedConfig.includes("Invalid API key")) {
      console.log("INVALID API KEY PROVIDED!");
      process.exit(2);
    } else if (formattedConfig.includes("html") || formattedConfig.includes("error") || formattedConfig.includes("server")) {
      console.log("API returned an error, please try again later.");
      process.exit(1);
    }

    // Write the config to a file
    fs.writeFileSync('config.json', formattedConfig);
    console.log("File: config.json has been updated");
  } catch (error) {
    console.error('API request failed:', error);
  }
}

async function startclient() {
  try {
    const starterResponse = await fetch(`https://nextdroopyinstances.imsocool098665.repl.co/developer/startbot`);
    const starter = await starterResponse.text();
    
    // Handle response for startbot
    if (starter.toLowerCase().includes("invalid") || starter.includes("html") || starter.includes("error") || starter.includes("server")) {
      console.log("Invalid version, API key, or API returned an error!");
      process.exit(1);
    }
  } catch (error) {
    console.error('API request failed:', error);
  }
}

module.exports = { update, startclient };