

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
      .setName('leaveparty')
      .setDescription('Leaves the current party'),
    async execute(interaction, botClient) {
      botClient.party.leave();
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Left Party')
        .setDescription('Left the current party!')
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };