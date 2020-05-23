module.exports = async (client, message) => {

    client.eventmanager('messageDelete', message)

}