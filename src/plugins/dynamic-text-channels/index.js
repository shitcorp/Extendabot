const Enmap = require("enmap");
const lastVC = new Enmap();

exports.init = (client) => {

console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
>>  Dynamic text-channels v1.0 is loaded and ready to go.
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`)

}



exports.plugin = {
    name: "Dynamic Text channels",
    version: "1.0",
    events: {
        voiceactivity: {
            run: async (client, voiceuserobject) => {
                let event = require('./events/voiceactivity')
                event.run(client, voiceuserobject)
            }
        }
    },
    conf: {
        version: "1.0",  // BOT version
        perms: ['KICK_MEMBERS', 'BAN_MEMBERS'],  // perms the bot needs to execute this plugin
        repo: "http://github.com", // to display if error happens
        author: "MeerBiene#7060",
        authordiscordid: "686669011601326281",
        type: "BASIC"
    },
    help: {
        // This info will be displayed in the global pluginmanager command
        name: "Dynamic text channels",
        desc: "This plugin allows you to save some voichechannel IDs and when users join this VC they will get access to a predefined Text channel.",
        category: "Utility"
    }
}