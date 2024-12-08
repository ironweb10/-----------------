

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');




module.exports = {
    data: new SlashCommandBuilder()
      .setName('crash')
      .setDescription('Crashes the current party the client is in'),
    async execute(interaction, botClient) {
      if (interaction.user.id === 382930404249698304) {
        await interaction.reply({
          content: 'Error: commandName is not a valid function.'
        });
      } else {
        if (!discord_crash_command) {
          client.party.me.setEmote('amongus');
          botClient.party.leave();
          console.log('Left party');
          const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Party Crashed')
            .setDescription('Party was crashed')
            .setTimestamp();
          await interaction.reply({ embeds: [embed] });
        } else {
          const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Command Disabled')
            .setDescription('Command is disabled by the owner!')
            .setTimestamp();
          await interaction.reply({ embeds: [embed] });
        }
      }
    }
  };