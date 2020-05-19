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
                category: "Utilities",
                description: "Translate from one language to another.",
                usage: "translate <from> <to> <text>"
            }
        },
        bye: {
            run: async (client, message, args, level) => {
                bye(message);
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['goodbye'],
                permLevel: "STAFF"
            },
            help: {
                name: "bye",
                category: "Mod",
                description: "This is a creative text, dont mind me",
                usage: "bye -> tells the world goodbye from you."
            }
        }
    },
    conf: {
        version: "1.0",  // BOT version
        perms: ['KICK_MEMBERS', 'BAN_MEMBERS'],  // perms the bot needs to execute this plugin
        repo: "http://github.com", // to display if error happens
        author: "MeerBiene#7060",
        authordiscordid: "686669011601326281"
    },
    help: {
        // This info will be displayed in the global pluginmanager command
        name: "Pluginname",
        desc: "This is a very creative plugindescription, cause i want to see if the formatting worked properly.",
        category: "test"
    }
}