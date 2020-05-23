module.exports = async (client, oldMember, newMember) => {

    client.eventmanager('presenceUpdate', oldMember, newMember)

}