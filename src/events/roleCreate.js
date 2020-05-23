module.exports = async (client, role) => {

    client.eventmanager('roleCreate', role)

}