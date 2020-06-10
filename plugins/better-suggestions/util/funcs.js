const config = require('../config.json')

module.exports = (client) => {

    client.messagecache = new Set()
    client.yes = {},
        client.no = {}


    client.voteend = (guildid, channelid) => {

        const handle = require('./db')


        // TODO: IDEA:
        // Get all message footers, compare IDs to database, if expired,
        // compare votes, save votes and if approved message id of approved
        // message.
        // TODO: check on message event, but set key to cache with TTL 30min
        // and check if that exists, so db doenst get spammed with requests.

        const channel = client.guilds.cache.get(guildid).channels.cache.get(channelid)

        channel.messages
            .fetch({ limit: 55 })
            .then((messages) => {
                let output = 0;
                for (const message of messages) {
                    for (const props of message) {
                        if (typeof props.embeds === "object") {
                            for (const embed of props.embeds) {
                                if (embed.footer !== null) {

                                    try {
                                        handle.dbfindbyid(embed.footer.text).then(resp => {
                                            if (!resp[0]) return new Error(`Document not found`)
                                            let systime = Date.now()
                                            if (resp[0].expires != "expired") {
                                                if (systime > resp[0].expires) {
                                                    var up = 0;
                                                    var down = 0;
                                                    channel.messages.fetch(resp[0].msgid)
                                                        .then(message => {

                                                            if (message.reactions.cache.size > 0) {
                                                                if (typeof message.reactions.cache.get("✅") === "object") {

                                                                    message.reactions.cache.get("✅").users.fetch().then(res => {
                                                                        up = res.size - 1

                                                                        if (res.has(resp[0].author) === true) {
                                                                            up--

                                                                        }

                                                                        message.reactions.cache.get("❌").users.fetch().then(res => {

                                                                            down = res.size - 1
                                                                            if (res.has(resp[0].author === true)) {
                                                                                down--
                                                                            }

                                                                            if (up < 3) {
                                                                                lost();
                                                                            } else if (up >= down * 2) {
                                                                                won();
                                                                            } else if (up == down) {
                                                                                won();
                                                                            } else {
                                                                                lost();
                                                                            }

                                                                            function won() {
                                                                                message.reactions.removeAll();
                                                                                message.edit(client.suggestioneend(message, client.users.cache.get(resp[0].author), resp[0].suggestion, "won", up, down, resp[0]._id))
                                                                                handle.dbupdate(resp[0].id, { expires: "expired" })
                                                                            }

                                                                            function lost() {
                                                                                message.reactions.removeAll();
                                                                                message.edit(client.suggestioneend(message, client.users.cache.get(resp[0].author), resp[0].suggestion, "lost", up, down, resp[0]._id))
                                                                                handle.dbupdate(resp[0].id, { expires: "expired" })
                                                                            }



                                                                        })

                                                                    }).catch(e => {
                                                                        console.error(e)
                                                                    })


                                                                }
                                                            }
                                                        })
                                                        .catch(console.error)
                                                }
                                            }
                                        })
                                    } catch (e) {
                                        console.log(e)
                                    }

                                }


                            }
                        }
                    }
                }



            })

    }


    client.newsuggestion = (message, text, expires, id) => {
        const { MessageEmbed } = require('discord.js')
        const embed = new MessageEmbed()
            .setTitle("New Suggestion")
            .setThumbnail(message.author.avatarURL())
            .setDescription(`Submitted by: ${message.author}\`\`\`${text}\`\`\``)
            .addField(
                "**Instructions**",
                `Please vote with :white_check_mark: or :x: to either let it go through or cancel it.`
            )
            .addField("**Time till vote ends:**", `${expires}`)
            .setFooter(id)
            .setColor(config.colors.defaultembed)
            .setTimestamp();
        return embed;
    }

    client.suggestioneend = (message, author, text, opt, up, down, id) => {
        const { MessageEmbed } = require("discord.js");
        const embed = new MessageEmbed()
            .setTitle(`This suggestion ${opt}.`)
            .setThumbnail(author.avatarURL())

            .addField(`**Votes:**`, ` 👍  **${up}**  👎  **${down}** `)
            .setTimestamp()
            .setFooter(id)
        if (opt == "won") {
            embed.setColor(config.colors.approvedembed)
            embed.setDescription(`Submitted by: ${author}\`\`\`${text}\`\`\`Posted in: ${message.guild.channels.cache.get(config["approved-channel"])}`);
        } else if (opt == "lost") {
            embed.setColor("RED")
            embed.setDescription(`Submitted by: ${author}\`\`\`${text}\`\`\``);
        }

        return embed;
    }

}