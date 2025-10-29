// discord.workers-1.0.0.js
import { registerSlashCommands } from './register.js'

export { registerSlashCommands }

export class DiscordBot {
  constructor(token, options = {}) {
    this.token = token
    this.intents = options.intents || []
    this.handlers = {}
    this.user = {}
    this.socket = null
  }

  on(event, callback) {
    this.handlers[event] = callback
  }

  async _identify(ws) {
    ws.send(JSON.stringify({
      op: 2,
      d: {
        token: this.token,
        intents: this._resolveIntents(this.intents),
        properties: {
          $os: "cloudflare",
          $browser: "workers",
          $device: "workers"
        }
      }
    }))
  }

  _resolveIntents(intents) {
    const map = {
      GUILDS: 1 << 0,
      GUILD_MEMBERS: 1 << 1,
      GUILD_MESSAGES: 1 << 9,
      DIRECT_MESSAGES: 1 << 12
    }
    return intents.reduce((acc, i) => acc | (map[i] || 0), 0)
  }

  async _handleMessage(payload) {
    if (payload.t === 'READY') {
      this.user = payload.d.user
      if (this.handlers.ready) this.handlers.ready()
    }

    if (payload.t === 'MESSAGE_CREATE') {
      if (this.handlers.messageCreate) this.handlers.messageCreate({
        content: payload.d.content,
        author: payload.d.author,
        reply: async (msg) => {
          await fetch(`https://discord.com/api/v10/channels/${payload.d.channel_id}/messages`, {
            method: 'POST',
            headers: {
              'Authorization': `Bot ${this.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: msg })
          })
        }
      })
    }

    if (payload.t === 'INTERACTION_CREATE') {
      if (this.handlers.interactionCreate) this.handlers.interactionCreate(payload.d)
    }
  }

  async listen() {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json')

      this.socket.onopen = () => this._identify(this.socket)
      this.socket.onmessage = (msg) => {
        const payload = JSON.parse(msg.data)
        this._handleMessage(payload)
      }
      this.socket.onerror = reject
      this.socket.onclose = resolve
    })
  }
}
