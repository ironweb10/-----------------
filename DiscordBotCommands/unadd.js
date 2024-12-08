const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
      .setName('unadd')
      .setDescription('Removes a user from the friend list')
      .addStringOption(option =>
        option.setName('usertounadd')
          .setDescription('User to unadd')
          .setRequired(true)
      ),
    async execute(interaction, botClient) {
      const unadduser = interaction.options.getString('usertounadd');
      botClient.removeFriend(unadduser);
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('User Unadded')
        .setDescription(`${unadduser} has been unadded!`)
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };
  