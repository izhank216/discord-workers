// register.js
export async function registerSlashCommands(token, commands, guildId) {
  if (!token) throw new Error("Bot token required")
  if (!commands || !Array.isArray(commands)) throw new Error("Commands array required")

  const url = guildId
    ? `https://discord.com/api/v10/applications/${await getBotId(token)}/guilds/${guildId}/commands`
    : `https://discord.com/api/v10/applications/${await getBotId(token)}/commands`

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bot ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands)
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Failed to register commands: ${err}`)
  }

  return await res.json()
}

async function getBotId(token) {
  const res = await fetch("https://discord.com/api/v10/users/@me", {
    headers: { "Authorization": `Bot ${token}` }
  })
  if (!res.ok) throw new Error("Failed to fetch bot info")
  const data = await res.json()
  return data.id
}
