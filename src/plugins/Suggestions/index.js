exports.plugin = {
    name: "Simple Suggestions",
    version: "1.0",
    cmds: {
        suggest: {
            run: async (client, message, args, level) => {
                let sugcmd = require('./cmds/suggest')
                try {
                    sugcmd.run(client, message, args, level)
                } catch (e) {
                    console.error(e)
                }
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "suggest",
                category: "Utility",
                description: "Submit a suggestion.",
                usage: "suggest <text>"
            }
        }
    },
    conf: {
        version: "1.0",  // BOT version
        perms: [],  // perms the bot needs to execute this plugin
        repo: "http://github.com/", // to display if error happens
        author: "MeerBiene#7060",
        authordiscordid: "686669011601326281"
    },
    help:{
        name: "Simple Suggestions",
        desc: "Epic suggestions plugin.",
        category: "Fun"
    }






}