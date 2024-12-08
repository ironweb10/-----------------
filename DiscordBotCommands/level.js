

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
      .setName('level')
      .setDescription('Sets the client\'s level')
      .addNumberOption(option =>
        option.setName('level')
          .setDescription('Level to set')
          .setRequired(true)
      ),
    async execute(interaction, botClient) {
      const leveltoset = interaction.options.getNumber('level');
      botClient.party.me.setLevel(parseInt(leveltoset, 10));
      const embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Level Set')
        .setDescription(`Level was set to ${leveltoset}`)
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };