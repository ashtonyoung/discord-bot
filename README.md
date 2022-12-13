# discord-bot

To use, create your own `config.json` file in the bot directory as such:
```
{
    "token": "YOUR-TOKEN",
    "clientId": "YOUR-CLIENT",
    "guildId": "YOUR-GUILD"
}
```
First, run `node deploy-commands.js` to update the commands API. Do this anytime you add/remove a slash command.

Then, run `node index.js` to start the bot. You can use commands while this process is active.

Depends on NPM packages:
- `discord.js`
- `string-table`

When minecraft releases an update, run `node update-items.js` to fetch new recipes.
This depends on the site `https://www.minecraftcrafting.info` being updated.
