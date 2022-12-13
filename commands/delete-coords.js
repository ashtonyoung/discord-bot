const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { getCoordByLocation, deleteCoord } = require('../bot-functions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-coords')
		.setDescription('Deletes saved coordinate. A user can only delete a coordinate they added')
        .addStringOption(option => 
            option
              .setName('location')
              .setDescription('location name of coordinate you want to delete')
              .setRequired(true)),
	async execute(interaction) {
        const file = './data/coords.json'
        let coords = JSON.parse(fs.readFileSync(file, 'utf-8')).data
        if (coords.length === 0) {
            await interaction.reply('No coordinates added yet, cannot delete.')
            return
        }
        const location = interaction.options.getString('location')
        const coord = getCoordByLocation(location)
        if (coord) {
            if (interaction.user.username === coord.user) {
                deleteCoord(location)
                await interaction.reply(`Successfully deleted coord:\n\`| ${coord.location} | (${coord.x}, ${coord.y}, ${coord.z}) | ${coord.region} |\``);
                return
            }
            await interaction.reply('Error: Cannot delete coord added by another user.');
            return
        }
        await interaction.reply('No coordinate found with that location name.')
	},
};