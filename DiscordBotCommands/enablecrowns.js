

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('enablecrowns')
      .setDescription('Enables Crowns, making lobbies harder'),
    async execute(interaction, botClient) {
      try {
        botClient.party.setPlaylist({ playlistName: 'playlist_bots_nobuildbr_duo' });
        botClient.party.chat.send('A user has enabled Crowns, meaning the lobbies might be harder!');
        setTimeout(() => {
          botClient.party.leave();
        }, 2000);
        const embed = new MessageEmbed()
          .setColor('#00FF00')
          .setTitle('Crowns Enabled')
          .setDescription('Enabled Crowns. REMINDER: These lobbies will be harder.')
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        console.error(error);
        const embed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription(`Error: ${error.message}`)
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      }
    }
  };