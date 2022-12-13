const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const stringTable = require('string-table');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays information about available commands'),
	async execute(interaction) {
        const commandsPath = __dirname;
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        let commands = []
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                commands.push({
                    command: command.data.name,
                    description: command.data.description
                })
            }
        }
        interaction.reply(`\`\`\`${stringTable.create(commands)}\`\`\``)
        // let str = 'Command:\t\t\tDescription:\n';
        // for (const file of commandFiles) {
        //     const filePath = path.join(commandsPath, file);
        //     const command = require(filePath);
        //     // Set a new item in the Collection with the key as the command name and the value as the exported module
        //     if ('data' in command && 'execute' in command) {
        //         str += `${command.data.name}\t\t\t${command.data.description}\n`
        //     }
        // }
        // interaction.reply(str)
	},
};

