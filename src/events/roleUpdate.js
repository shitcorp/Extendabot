module.exports = async (client, oldRole, newRole) => {

    client.eventmanager('roleUpdate', oldRole, newRole)

}