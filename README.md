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


```js import { DiscordBot, registerSlashCommands } from 'https://discord-workers.pages.dev/discord.workers-1.0.0.js```js
Note: If you are not using slash commands, you can skip calling registerSlashCommands entirely. Your bot will still work with message events and replies.

## Example
import { DiscordBot, registerSlashCommands } from 'https://discord-workers.pages.dev/discord.workers-1.0.0.js'

`const bot = new DiscordBot(BOT_TOKEN, { intents: ['GUILDS', 'GUILD_MESSAGES'] })

bot.on('ready', () => console.log(`Logged in as ${bot.user.username}`))

bot.on('messageCreate', msg => {
  if (msg.content === '!ping') msg.reply('🏓 Pong!')
})

// Register slash commands (optional)
await registerSlashCommands(BOT_TOKEN, [
  { name: 'hello', description: 'Say hi!', type: 1 },
  { name: 'ping', description: 'Check latency', type: 1 }
], 'YOUR_GUILD_ID')

await bot.listen()`

## Notes
- Requires Wrangler v4+ if you use Workers
- Slash commands can be global or guild-specific
- Fully serverless, no Node.js needed


