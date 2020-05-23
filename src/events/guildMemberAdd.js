module.exports = (client, member) => {

    client.eventmanager('guildMemberAdd', member)

}