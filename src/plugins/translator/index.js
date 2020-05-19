exports.plugin = {
    name: "Translator Plugin",
    version: "1.0",
    cmds: {
        translate: {
            run: async (client, message, args, level) => {
                let cmd = require('./cmds/translate')
                cmd.run(client, message, args, level)
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "translate",
                category: "Utility",
                description: "Translate from one language to another.",
                usage: "translate <from> <to> <text>"
            }
        }
    },
    conf: {
        version: "1.0",  // BOT version
        perms: ['READ_MESSAGES', 'SEND_MESSAGES'],  // perms the bot needs to execute this plugin
        repo: "http://github.com", // to display if error happens
        author: "MeerBiene#7060",
        authordiscordid: "686669011601326281"
    },
    help: {
        // This info will be displayed in the global pluginmanager command
        name: "Translator",
        desc: "This plugin allows you/your members to easily translate something from one language to another, using the googe translator API.",
        category: "Utility"
    }
}