module.exports = async (client, oldGuild, newGuild) => {
    for (let plugin in client.plugins) {
        if (plugin.events) {            
            for (let event in plugin.events) {
                if (plugin.events.hasOwnProperty(event)) {
                    let value = plugin.events[event]
                    if (event === "guildUpdate") {
                        value.run(client, oldGuild, newGuild)
                    }
                }
            }
        }
    }
}