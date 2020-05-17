module.exports = async (client, oldRole, newRole) => {
    for (let plugin in client.plugins) {
        if (plugin.events) {            
            for (let event in plugin.events) {
                if (plugin.events.hasOwnProperty(event)) {
                    let value = plugin.events[event]
                    if (event === "roleUpdate") {
                        value.run(client, oldRole, newRole)
                    }
                }
            }
        }
    }
}