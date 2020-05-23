exports.plugin = {
    name: "Advanced Game Wikis:",
    version: "1.0",
    cmds: {
        wiki: {
            run: async (client, message, args, level) => {
                let wikicmd = require('./cmds/wiki')
                try {
                    wikicmd.run(client, message, args, level)
                } catch(e) {
                    client.logger.warn(`[ADVANCED GAME WIKIS] There was an error trying to execute the 'wiki' command due to the following error: \n${e}`)
                }
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "wiki",
                category: "Utility",
                description: "Wiki lookup command.",
                usage: "wiki [pagename] | Returns the link to the desired wiki page.  \n> wiki -a  |  Lists all registered wiki pages."
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
    help: {
        // This info will be displayed in the global pluginmanager command
        name: "Advanced Game Wikis",
        desc: "An advanced game wiki plugin that allows you to specify wikipages that your users can request.",
        category: "Utility"
    }
}