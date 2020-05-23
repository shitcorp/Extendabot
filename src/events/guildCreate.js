
const Discord = require('discord.js')


module.exports = (client, guild) => {

  client.logger.dba(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);

  client.eventmanager('guildCreate', guild);

};