module.exports = async (client, messageReaction, user) => {

    client.eventmanager('messageReactionRemove', messageReaction, user)

}