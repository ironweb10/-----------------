const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Shows the bot status.'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Bot Status')
            .setDescription('Bot is running and online!');
        await interaction.reply({ embeds: [embed] });
    }
};
