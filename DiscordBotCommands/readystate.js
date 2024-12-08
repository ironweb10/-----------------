

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('readystate')
      .setDescription('Sets the bot\'s ready state')
      .addBooleanOption(option =>
        option.setName('state')
          .setDescription('Ready state')
          .setRequired(true)
      ),
    async execute(interaction, botClient) {
      const readystate = interaction.options.getBoolean('state');
      if (readystate) {
        botClient.party.me.setReadiness(true);
        const embed = new MessageEmbed()
          .setColor('#00FF00')
          .setTitle('Bot Ready')
          .setDescription('I am now ready')
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      } else {
        botClient.party.me.setReadiness(false);
        const embed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Bot Unready')
          .setDescription('I am now unready')
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      }
    }
  };
  