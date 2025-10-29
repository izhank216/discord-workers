/**
 * Set the bot's Rich Presence / activity
 * @param {DiscordBot} bot - instance of DiscordBot
 * @param {Object} options - Activity options
 *   {
 *     name: "Playing Something", // optional, defaults to bot's username
 *     type: 0, // 0=Playing,1=Streaming,2=Listening,3=Watching,5=Competing
 *     status: "online" // "online", "idle", "dnd", "invisible"
 *   }
 */
export function setRichPresence(bot, options = {}) {
  if (!bot.socket || bot.socket.readyState !== WebSocket.OPEN) {
    throw new Error("WebSocket is not open")
  }

  // Use bot's username as default name if none provided
  const activityName = options.name || (bot.user && bot.user.username) || "My Bot"

  const payload = {
    op: 3, // Presence Update
    d: {
      since: null,
      activities: [
        {
          name: activityName,
          type: options.type || 0
        }
      ],
      status: options.status || "online",
      afk: false
    }
  }

  bot.socket.send(JSON.stringify(payload))
}
