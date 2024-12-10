const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Sets the current playlist if the bot is party leader')
    .addStringOption(option =>
      option.setName('mnemonic')
        .setDescription('The new mnemonic (Playlist id or island code)')
        .setRequired(true)
    ),
  async execute(interaction, botClient) {
    const mnemonic = interaction.options.getString('mnemonic');
   

    try {
     
      await botClient.party.setPlaylist(mnemonic); //I was looking for this for more than 1 year siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu

      const embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Playlist Updated')
        .setDescription(`Playlist set to: ${mnemonic}`)
        
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const errorEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription(`Failed to update playlist: ${error.message}`)
        .setTimestamp();
      await interaction.reply({ embeds: [errorEmbed] });
    }
  }
};
