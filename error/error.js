/**
 * Central error handler for discord.workers
 * Automatically handles any errors from prefix or slash commands.
 *
 * @param {Object} bot - Your DiscordBot instance
 * @param {Error} err - The error object
 * @param {Object} context - Optional context info
 *   { type: 'prefix' | 'slash', message?, interaction?, commandName? }
 */
export function handleError(bot, err, context = {}) {
  // Log error to console
  console.error(`[ERROR] Command type: ${context.type || 'unknown'}`)
  console.error(err)

  try {
    if (context.type === 'prefix' && context.message) {
      context.message.reply(`❌ An error occurred: ${err.message}`)
    } else if (context.type === 'slash' && context.interaction) {
      context.interaction.reply({
        content: `❌ An error occurred: ${err.message}`,
        ephemeral: true
      })
    }
  } catch (e) {
    console.error('[ERROR] Failed to send error message', e)
  }
}
