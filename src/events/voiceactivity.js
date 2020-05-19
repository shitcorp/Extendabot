module.exports = async (client, voiceuserobject) => {
    // when channel is "null" the user left the voicechannel
    client.plugins.forEach(plugin => {
        if (plugin.events) {            
            for (let event in plugin.events) {
                if (plugin.events.hasOwnProperty(event)) {
                    let value = plugin.events[event]
                    if (event === "voiceactivity") {
                        value.run(client, voiceuserobject)
                    }
                }
            }
        }
    })
}