
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
      .setName('restartfnclient')
      .setDescription('Restarts the Fortnite client'),
    async execute(interaction, botClient) {
        botClient.restart();
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Restarting FN Client')
        .setDescription('FN client is restarting!')
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };