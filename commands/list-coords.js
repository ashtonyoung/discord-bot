const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const stringTable = require('string-table');
const { compareRegion } = require('../bot-functions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list-coords')
		.setDescription('For a minecraft world: lists saved coords. Can filter by user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Filter to ONLY show coords added by this user')),
	async execute(interaction) {
        const file = './data/coords.json'
        let coords = JSON.parse(fs.readFileSync(file, 'utf-8')).data
        if (coords.length === 0) {
            await interaction.reply('No coordinates added yet')
            return
        }
        const user = interaction.options.getUser('user')
        if (user) {
            coords = coords.filter(coord => coord.user === user.username)
            if (coords.length === 0) {
                await interaction.reply('No coordinates found for that user.')
                return
            }
        }
        //sort alphabetically
        coords.sort(compareRegion)
        let table = `\`\`\`${stringTable.create(coords)}\`\`\``
		await interaction.reply(table);
	},
};