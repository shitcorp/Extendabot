module.exports = async (client, role) => {
    client.plugins.forEach(plugin => {
        if (plugin.events) {            
            for (let event in plugin.events) {
                if (plugin.events.hasOwnProperty(event)) {
                    let value = plugin.events[event]
                    if (event === "roleDelete") {
                        value.run(client, role)
                    }
                }
            }
        }
    })
}