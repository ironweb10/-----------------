
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');




module.exports = {
    data: new SlashCommandBuilder()
      .setName('playlist')
      .setDescription('Sets the current playlist if the bot is party leader')
      .addStringOption(option =>
        option.setName('playlist')
          .setDescription('Playlist to set')
          .setRequired(true)
      ),
    async execute(interaction, botClient) {
      const setplaylist = interaction.options.getString('playlist');
      botClient.party.setPlaylist({ playlistName: setplaylist });
      const embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Playlist Set')
        .setDescription(`Playlist Id: ${setplaylist} has been set as the playlist!`)
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };
  