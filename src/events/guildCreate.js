
const Discord = require('discord.js')


module.exports = (client, guild) => {

  client.logger.dba(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);

  client.plugins.forEach(plugin => {
    if (plugin.events) {            
      for (let event in plugin.events) {
          if (plugin.events.hasOwnProperty(event)) {
              let value = plugin.events[event]
              if (event === "guildCreate") {
                  value.run(client, guild)
              }
          }
      }
    }
  })

};