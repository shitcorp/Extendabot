const config = require('./config/config.json')

exports.plugin = {
    name: "Minigames",
    desc: "Some fun mini games for your server.",
    cmds: {
        dice: {
            run: async (client, message, args, level) => {
                if (!config.dice) return
                let dcmd = require('./cmds/dice')
                if (!dcmd) return
                try {
                    dcmd.run(client, message, args, level)
                } catch (e) {
                    client.logger.warn(`[MINIGAMES] There was an error trying to execute the 'dice' command. Error: \n${e}`)
                }
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "dice",
                category: "Fun",
                description: "Roll a dice.",
                usage: "dice -> returns an Integer between 1 and 6"
            }
        },
        rps: {
            run: async (client, message, args,level) => {
                if (!config.rps) return
                let rcmd = require('./cmds/rps')
                if (!rcmd) return
                try {
                    rcmd.run(client, message, args, level)
                } catch (e) {
                    client.logger.warn(`[MINIGAMES] There was an error trying to execute the 'rps' command. Error: \n${e}`)
                }
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "rps",
                category: "Fun",
                description: "Rock Paper Scissors.",
                usage: "rps -> Play a round of rock paper scissors against the bot and see if you win."
            }
        },
        love: {
            run: async (client, message, args, level) => {
                if (!config.love) return
                let lcmd = require('./cmds/love')
                if (!lcmd) return
                try {
                    lcmd.run(client, message, args, level)
                } catch (e) {
                    client.logger.warn(`[MINIGAMES] There was an error trying to execute the 'love' command. Error: \n${e}`)
                }
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "love",
                category: "Fun",
                description: "<3",
                usage: "love @User -> Returns how much that mentioned user loves you."
            }
        },
        achievement: {
            run: async (client, message, args, level) => {
                if (!config.achievement) return
                let acmd = require('./cmds/achievement')
                if (!acmd) return
                try {
                    acmd.run(client, message, args, level)
                } catch (e) {
                    client.logger.warn(`[MINIGAMES] There was an error trying to execute the 'achievement' command. Error: \n${e}`)
                }
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "achievement",
                category: "Fun",
                description: "Enter some funny achievement.",
                usage: "achievement <text> -> Returns a nice little achievement unlocked embed."
            }
        },
        meme: {
            run: async (client, message, args, level) => {
                if (!config.meme.enabled) return
                let mcmd = require('./cmds/meme')
                if (!mcmd) return
                try {
                    mcmd.run(client, message, args, level)
                } catch (e) {
                    client.logger.warn(`[MINIGAMES] There was an error trying to execute the 'meme' command. Error: \n${e}`)
                }

            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "meme",
                category: "Fun",
                description: "Funi memes big laugh moment.",
                usage: "meme -> Returns a random meme."
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
        name: "Minigames",
        desc: "Some sweet minigames for your server.",
        category: "Fun"
    }

}