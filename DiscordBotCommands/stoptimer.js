
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
      .setName('stoptimer')
      .setDescription('Stops the setTimeout function aka the party timer'),
    async execute(interaction) {
      if (timerstatus === true) {
        timerstatus = false;
        let id = this.ID;
        console.log(`[PARTY] timer id: ${id}`);
        clearTimeout(id);
        console.log('[PARTY] Time has stopped!');
        const embed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Timer Stopped')
          .setDescription(`TimerID: ${id} has now been stopped!`)
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('No Active Timer')
          .setDescription('Timer is not running!')
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      }
    }
  };