

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
      .setName('sitout')
      .setDescription('Sets the sitting out state')
      .addBooleanOption(option =>
        option.setName('sitingout')
          .setDescription('Set sitting out state')
          .setRequired(true)
      ),
    async execute(interaction, botClient) {
      const sitvalue = interaction.options.getBoolean('sitingout');
      if (sitvalue) {
        botClient.party.me.setSittingOut(true);
        const embed = new MessageEmbed()
          .setColor('#00FF00')
          .setTitle('Sitting Out State Set')
          .setDescription(`Sitting out state set to ${sitvalue}`)
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      } else {
        botClient.party.me.setSittingOut(false);
        const embed = new MessageEmbed()
          .setColor('#00FF00')
          .setTitle('Sitting Out State Set')
          .setDescription(`Sitting out state set to ${sitvalue}`)
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      }
    }
  };