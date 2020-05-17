module.exports = async (client, oldMessage, newMessage) => {
    for (let plugin in client.plugins) {
        if (plugin.events) {            
            for (let event in plugin.events) {
                if (plugin.events.hasOwnProperty(event)) {
                    let value = plugin.events[event]
                    if (event === "messageUpdate") {
                        value.run(client, oldMessage, newMessage)
                    }
                }
            }
        }
    }
}