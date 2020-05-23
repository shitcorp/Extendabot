const Discord = require('discord.js')

module.exports = async (client, messageReaction, user) => {

    client.eventmanager('messageReactionAdd', messageReaction, user)

}