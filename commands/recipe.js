const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const { getItemByName } = require('../bot-functions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('recipe')
		.setDescription('Finds recipe for given item/block.')
        .addStringOption(option => 
            option
              .setName('item')
              .setDescription('Search the desired item name')
              .setRequired(true)),
	async execute(interaction) {

        //check to see if exists
        const item_name = interaction.options.getString('item')
        const item = getItemByName(item_name)
        if (!item) {
            await interaction.reply(`Cannot find recipe for \`${item_name}\``)
            return
        }

        const itemEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(item.name)
            .setURL('https://www.minecraftcrafting.info')
            // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            .setDescription(`Ingredients: ${item.ingredients}`)
            // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            // .addFields(
            //     { name: 'Regular field title', value: 'Some value here' },
            //     { name: '\u200B', value: '\u200B' },
            //     { name: 'Inline field title', value: 'Some value here', inline: true },
            //     { name: 'Inline field title', value: 'Some value here', inline: true },
            // )
            // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            .setImage(item.img_src)
            // .setTimestamp()
            .setFooter({ text: item.description })
        // const img = fs.readFileSync('/Users/ashtonyoung/Downloads/craft_pickaxes.gif')
		// await interaction.reply('world!');
        interaction.reply({ embeds: [itemEmbed] });

        //TODO consider random recipe
	},
};
