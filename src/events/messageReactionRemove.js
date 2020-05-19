module.exports = async (client, messageReaction, user) => {
    client.plugins.forEach(plugin => {
        if (plugin.events) {            
            for (let event in plugin.events) {
                if (plugin.events.hasOwnProperty(event)) {
                    let value = plugin.events[event]
                    if (event === "messageReactionRemove") {
                        value.run(client, messageReaction, user)
                    }
                }
            }
        }
    })
}