module.exports = (client, member) => {

    client.eventmanager('guildMemberRemove', member)

}