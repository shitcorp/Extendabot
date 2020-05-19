const Enmap = require("enmap");
const lastVC = new Enmap();

exports.run = (client, voiceuserobject) => {

    const config = require('../data/config.json')

    
    async function channelgetter(check) {

        const channels = require('../data/channels.json')

        for (var vc in channels) {
            if (channels.hasOwnProperty(vc)) {
                let txt = channels[vc]
                //console.log(vc, txt)
                if (vc === check) {
                    return txt
                }
            }
        }
    }


    async function channelmanager(id, opt) {

        if (!id) return

        let txtchan = client.guilds.get(voiceuserobject.guild).channels.get(id)
        
        await txtchan.overwritePermissions(voiceuserobject.user, {
            VIEW_CHANNEL: opt,
            READ_MESSAGE_HISTORY: opt,
            READ_MESSAGES: opt,
            ADD_REACTIONS: opt,
            SEND_MESSAGES: opt
        })

    }
  
    if (voiceuserobject.channel !== null) {
        // User joined vc
        channelgetter(voiceuserobject.channel).then(async chan => {
            
            await channelmanager(chan, true)
            lastVC.set(voiceuserobject.user, voiceuserobject.channel)
            //console.log(lastVC)

        }).catch(error => {
            return
        })

    } else {
        // user left channel 

        let lastvc = lastVC.get(voiceuserobject.user)
        if (lastvc) {
            // lastvc resembled the textchannel the user was added to.
            channelgetter(lastvc).then(chan => {

                channelmanager(chan, false)

            }).catch(error => {
                return
            })
            
            lastVC.delete(voiceuserobject.user)
        } 

    }
    
}