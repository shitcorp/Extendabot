module.exports = async (client, oldRole, newRole) => {
    client.plugins.forEach(plugin => {
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
    })
}