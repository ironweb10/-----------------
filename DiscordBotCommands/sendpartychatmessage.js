

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
      .setName('sendpartychatmessage')
      .setDescription('Sends a message to the Fortnite party chat')
      .addStringOption(option =>
        option.setName('message')
          .setDescription('Message to send')
          .setRequired(true)
      ),
    async execute(interaction, botClient) {
      const message = interaction.options.getString('message');
      botclient.party.chat.send(message);
      const embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Message Sent')
        .setDescription(`Message: "${message}" has been sent in the party chat!`)
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };
