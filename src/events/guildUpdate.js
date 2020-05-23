module.exports = async (client, oldGuild, newGuild) => {

    client.eventmanager('guildUpdate', {oldGuild, newGuild})

}