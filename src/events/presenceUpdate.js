module.exports = async (client, oldMember, newMember) => {


    client.plugins.forEach(plugin => {
        if (plugin.events) {            
            for (let event in plugin.events) {
                if (plugin.events.hasOwnProperty(event)) {
                    let value = plugin.events[event]
                    if (event === "presenceUpdate") {
                        value.run(client, oldMember, newMember)
                    }
                }
            }
        }
    })






}