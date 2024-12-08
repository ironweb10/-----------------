const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setoutfit')
        .setDescription('Sets an outfit for the bot.')
        .addStringOption(option =>
            option.setName('cosmeticname')
                .setDescription('The name of the cosmetic to set.')
                .setRequired(true)),
    async execute(interaction, botClient) {
        const cosmeticName = interaction.options.getString('cosmeticname').toLowerCase();

        try {
            const response = await fetch(`https://fortnite-api.com/v2/cosmetics/br/search?name=${cosmeticName}`);
            const data = await response.json();

            if (data.status !== 200 || !data.data) {
                return await interaction.reply({
                    content: `No cosmetic found with the name: ${cosmeticName}. Please check the spelling or try another name.`,
                    ephemeral: true,
                });
            }

            const cosmetic = data.data; 

            const { name, description, images, rarity } = cosmetic;

            if (!botClient.party || !botClient.party.me) {
                return await interaction.reply({
                    content: "The bot is not in a party or the party is not initialized yet. Please try again later.",
                    ephemeral: true,
                });
            }

            await botClient.party.me.setOutfit(cosmetic.id);

            const embed = {
                color: rarity.value === 'rare' ? 0x0070FF : rarity.value === 'epic' ? 0x9B00FF : 0xFFD700,
                title: name,
                description: description,
                thumbnail: {
                    url: images.smallIcon,
                },
                fields: [
                    {
                        name: 'Rarity',
                        value: rarity.displayValue,
                        inline: true,
                    },
                    {
                        name: 'Cosmetic Set',
                        value: cosmetic.set?.text || 'No set',
                        inline: true,
                    },
                ],
                
                timestamp: new Date(),
            };

            await interaction.reply({
                content: `The outfit **${name}** has been set successfully!`,
                embeds: [embed],
            });
        } catch (error) {
            console.error("Error setting outfit:", error);
            await interaction.reply({
                content: `Failed to set outfit. Error: ${error.message}`,
                ephemeral: true,
            });
        }
    },
};
