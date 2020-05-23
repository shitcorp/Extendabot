module.exports = async (client, oldMessage, newMessage) => {

    client.eventmanager('messageUpdate', oldMessage, newMessage)

}