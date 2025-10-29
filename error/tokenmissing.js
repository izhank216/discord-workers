/**
 * Checks if the bot token is present and valid
 *
 * @param {string} token - The Discord bot token (from secret or env)
 */
export function checkToken(token) {
  const invalidValues = ['BOT_TOKEN', 'DISCORD_BOT_TOKEN', 'TOKEN', '', null, undefined]

  if (!token || invalidValues.includes(token)) {
    console.error('❌ ERROR: Bot token is missing or not set as a secret.')
    throw new Error('Bot token is missing. Please set it in your environment variables or secrets.')
  }
}
