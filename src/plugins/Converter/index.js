exports.plugin = {
    name: "Simple Unit Converter",
    version: "1.0",
    cmds: {
        convert: {
            run: async (client, message, args, level) => {
                let convertcmd = require('./cmds/convert')
                try { 
                    convertcmd.run(client, message, args, level)
                } catch(e) {
                    client.logger.warn(`[SIMPLE UNIT CONVERTER] There was an error trying to execute the 'convert' command due to the following error: \n${e}`)
                }
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "convert",
                category: "Converter",
                description: "Unit convert command.",
                usage: "convert <from> <to> <amount> | returns the converted amount. \n> convert -p <unit>   |  returns all possible conversions for this unit."
            }
        },
        info: {
            run: async (client, message, args, level) => {
                let infocmd = require('./cmds/info')
                try { 
                    infocmd.run(client, message, args, level)
                } catch(e) {
                    client.logger.warn(`[SIMPLE UNIT CONVERTER] There was an error trying to execute the 'info' command due to the following error: \n${e}`)
                }
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "info",
                category: "Converter",
                description: "Unit info command.",
                usage: "info <unit> || returns some basic information about the specified unit." 
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
        // This info will be displayed in the global plugin manager command
        name: "Simple Unit Converter",
        desc: "A simple unit converter that allows you to convert units as well as display some information about them.",
        category: "Utility"
    }
}