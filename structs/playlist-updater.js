
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const playlists_url = 'https://fortnite-api.com/v1/playlists';

function updatePlaylists() {
    axios.get(playlists_url)
        .then(response => {
            const playlists = response.data.data;
            const playlistIds = playlists.map(playlist => playlist.id.toLowerCase());

            const content = `module.exports.allowedPlaylists = Object.freeze([\n    "${playlistIds.join('",\n    "')}"\n])\n\nmodule.exports.websocketHeaders = Object.freeze({\n   'Accept-Version': '*',\n   'Pragma': 'no-cache',\n   'Cache-Control': 'no-cache'\n})\n`;

            fs.writeFileSync('utils/constants.js', content, 'utf8');
            console.log(chalk.yellow('[Playlists] Playlists Updated'));
        })
        .catch(error => {
            console.error('[Playlists] Error:', error);
        });
}

module.exports = updatePlaylists;
