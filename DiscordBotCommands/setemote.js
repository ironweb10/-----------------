const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setemote')
        .setDescription('Sets the client\'s emote using the emote name.')
        .addStringOption(option =>
            option.setName('emotename')
                .setDescription('Name of the emote')
                .setRequired(true)
        ),
    async execute(interaction, botClient) {
        const emoteName = interaction.options.getString('emotename').toLowerCase();

        try {
            const response = await fetch(`https://fortnite-api.com/v2/cosmetics/br/search?name=${emoteName}`);
            const data = await response.json();

            if (data.status !== 200 || !data.data || !data.data.id) {
                return await interaction.reply({
                    content: `No emote found with the name: ${emoteName}. Please check the spelling or try another name.`,
                    ephemeral: true,
                });
            }

            const emote = data.data;

            const { name, description, images, rarity } = emote;

            if (!botClient.party || !botClient.party.me) {
                return await interaction.reply({
                    content: "The bot is not in a party or the party is not initialized yet. Please try again later.",
                    ephemeral: true,
                });
            }

            await botClient.party.me.setEmote(emote.id);

            const embed = new MessageEmbed()
                .setColor(rarity.value === 'rare' ? '#0070FF' : rarity.value === 'epic' ? '#9B00FF' : '#FFD700')
                .setTitle(name)
                .setDescription(description)
                .setThumbnail(images.smallIcon)
                .addField('Rarity', rarity.displayValue, true)
                .addField('Emote Set', emote.set?.text || 'No set', true)
              
                .setTimestamp();

            await interaction.reply({
                content: `The emote **${name}** has been set successfully!`,
                embeds: [embed],
            });

        } catch (error) {
            console.error("Error setting emote:", error);
            await interaction.reply({
                content: `Failed to set emote. Error: ${error.message}`,
                ephemeral: true,
            });
        }
    },
};
