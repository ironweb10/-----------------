
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
      .setName('restart-fn-bot')
      .setDescription('Restarts the Fortnite bot'),
    async execute(interaction, botClient) {
        botClient.restart();
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Restarting Fortnite bot')
        .setDescription('Restarting...')
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };
