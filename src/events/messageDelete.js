module.exports = async (client, message) => {
    client.plugins.forEach(plugin => {
        if (plugin.events) {            
            for (let event in plugin.events) {
                if (plugin.events.hasOwnProperty(event)) {
                    let value = plugin.events[event]
                    if (event === "messageDelete") {
                        value.run(client, message)
                    }
                }
            }
        }
    })
}