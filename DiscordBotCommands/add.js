const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Adds a user to the friend list')
    .addStringOption(option =>
      option.setName('user')
        .setDescription('User to add')
        .setRequired(true)
    ),
  async execute(interaction, botClient) {
    const user = interaction.options.getString('user');
    botClient.addFriend(user);
    const embed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle('User Added')
      .setDescription(`${user} has been sent a friend request`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
