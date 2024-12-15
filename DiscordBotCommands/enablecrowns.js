

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('enablecrowns')
      .setDescription('Enables Crowns.'),
    async execute(interaction, botClient) {
      try {
        botClient.party.setPlaylist('playlist_bots_defaultduo');
         setTimeout(() => {
          botClient.party.leave();
        }, 3000);
        const embed = new MessageEmbed()
          .setColor('#00FF00')
          .setTitle('Crowns Enabled')
          .setDescription('Enabled Crowns 👑.')
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
