# Discord Workers

A lightweight Discord bot library designed specifically for **Cloudflare Workers**.  
Build fully serverless Discord bots with slash commands and message handling — no Node.js required.

---

## Features

- **DiscordBot class**: Connect to Discord Gateway via WebSocket  
- **Message events**: Listen to `messageCreate` events and reply  
- **Slash commands**: Register and manage slash commands with `registerSlashCommands`  
- **Single import**: Use directly from Cloudflare Pages

---

## Installation / Usage

Import the library directly from your Cloudflare Pages URL:

``import { DiscordBot, registerSlashCommands } from 'https://discord-workers.pages.dev/discord.workers-1.0.0.js'``

Note: If you are not using slash commands, you can skip calling registerSlashCommands entirely. Your bot will still work with message events and replies.

## Notes
- Requires Wrangler v4+ if you use Workers
- Slash commands can be global or guild-specific
- Fully serverless, no Node.js needed

## Rich Presence / RPC

discord.workers includes a setRichPresence function to set your bot’s rich presence.

Automatically uses your bot’s username as the activity name if none is provided.

If your bot doesn’t support RPC natively, you can still use setRichPresence directly from the import.

## Importing
`import { setRichPresence } from 'https://discord-workers.pages.dev/discord.workers-1.0.0.js'`

## Activity Types

**Type**                  **Meaning**


- 0                         Playing
- 1	                        Streaming
- 2	                        Listening
- 3	                        Watching
- 4                         Custom Status
- 5	                        Competing

## Example usage:
`setRichPresence(bot, { type: 1, name: "Streaming Fun" })`

## Example

```js
const bot = new DiscordBot(BOT_TOKEN, { intents: ['GUILDS', 'GUILD_MESSAGES'] })`

bot.on('ready', () => console.log(`Logged in as ${bot.user.username}`))`

bot.on('messageCreate', msg => {
  if (msg.content === '!ping') msg.reply('🏓 Pong!')
})

// Register slash commands (optional)
await registerSlashCommands(BOT_TOKEN, [
  { name: 'hello', description: 'Say hi!', type: 1 },
  { name: 'ping', description: 'Check latency', type: 1 }
], 'YOUR_GUILD_ID')`

await bot.listen()
