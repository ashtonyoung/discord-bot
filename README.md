# discord-bot

Use this link to add the bot to your server
https://discord.com/api/oauth2/authorize?client_id=1049827338751320074&permissions=2147485696&scope=applications.commands%20bot
*NOTE: You must be a server owner to do this*

To use, create your own `config.json` file in the bot directory as such:
```
{
    "token": "YOUR-TOKEN",
    "clientId": "YOUR-CLIENT",
    "guildId": "YOUR-GUILD"
}
```
1. Run `npm install` in `bot` folder to install all dependencies.
2. Run `node deploy-commands.js` to update the commands API. Do this anytime you add/remove a slash command.
3. Run `node index.js` to start the bot. You can use commands while this process is active.

### Dependencies:
- NPM Packages
  - `discord.js`
  - `string-table`
- JS
  - Node v18 or higher
    - Relies on `fetch()`

When minecraft releases an update, run `node update-items.js` to fetch new recipes.
This depends on the site https://www.minecraftcrafting.info being updated.
