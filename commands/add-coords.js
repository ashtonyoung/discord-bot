const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { duplicateLocation } = require('../bot-functions');

//consider adding types of coords: Nether, End, Overworld

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-coords')
		.setDescription('Adds coordinate location. To view all, use `list-coords` command')
        .addIntegerOption(option =>
			option
				.setName('x-coord')
				.setDescription('X-Coordinate value')
				.setRequired(true))
      .addIntegerOption(option =>
			  option
				.setName('y-coord')
				.setDescription('Y-Coordinate value')
				.setRequired(true))
      .addIntegerOption(option =>
			  option
				.setName('z-coord')
				.setDescription('Z-Coordinate value')
				.setRequired(true))
      .addStringOption(option => 
        option
          .setName('location')
          .setDescription('Give a brief description of the location')
          .setRequired(true))
          .addStringOption(option =>
        option.setName('region')
          .setDescription('What region are the coordinates in?')
          .setRequired(true)
          .addChoices(
            { name: 'overworld', value: 'overworld' },
            { name: 'nether', value: 'nether' },
            { name: 'end', value: 'end' },
          )),
	async execute(interaction) {
        const location = interaction.options.getString('location')
        if (duplicateLocation(location)) {
          interaction.reply('Location name in use. Please use different name')
          return
        }
        const file = './data/coords.json'
        const coords = JSON.parse(fs.readFileSync(file, 'utf-8'))
        const new_coord = {
            location: interaction.options.getString('location').toLowerCase(),
            x: interaction.options.getInteger('x-coord'),
            y: interaction.options.getInteger('y-coord'),
            z: interaction.options.getInteger('z-coord'),
            region: interaction.options.getString('region'),
            user: interaction.user.username,
        }
        coords.data.push(new_coord)
        fs.writeFileSync(file, JSON.stringify(coords), 'utf-8')
		await interaction.reply(`Successfully added new coord:\n\`| ${new_coord.location} | (${new_coord.x}, ${new_coord.y}, ${new_coord.z}) | ${new_coord.region} |\``);
	},
};