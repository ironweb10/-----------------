
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('restartall')
      .setDescription('Restarts all clients'),
    async execute(interaction) {
      await interaction.reply({
        content: 'All clients are currently being killed!'
      });
      function killbot() {
        process.exit(1);
      }
      setTimeout(killbot, 1000);
    }
  };