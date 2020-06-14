const config = require('../config.json')

module.exports = (client) => {

    client.voteend = async (guildid) => {

        const handle = require('./db')
        const { configget } = require('./db')
        const guildconfig = await configget(guildid)
        const guildname = client.guilds.cache.get(guildid).name

        if (!guildconfig[0]) return client.logger.debug(`No configuration found for "${guildname}" [${guildid}]`)

        const channel = client.guilds.cache.get(guildid).channels.cache.get(guildconfig[0].suggestions_channel)

        channel.messages
            .fetch({ limit: 100 })
            .then(async (messages) => {
                client.logger.log(`Fetched ${messages.size} messages in guild: "${guildname}" [${guildid}].`)
                let i = 1;
                let k = messages.size
                for (const message of messages) {
                    client.logger.debug(`Checking message ${i}/${k} `)
                    for (const props of message) {
                        if (typeof props.embeds === "object") {
                            for (const embed of props.embeds) {
                                if (embed.footer !== null) {
                                    try {
                                        handle.dbfindbyid(embed.footer.text).then(async resp => {
                                            if (!resp[0]) return client.logger.debug(`Suggestion "${embed.footer.text}" not found`)
                                            let systime = Date.now()
                                            if (resp[0].expires != "expired") {
                                                if (resp[0].guildid === guildid) {
                                                    if (systime > resp[0].expires) {
                                                        client.logger.debug(`Suggestion ${resp[0]._id} expired.`)
                                                        var up = 0;
                                                        var down = 0;
                                                        channel.messages.fetch(resp[0].msgid)
                                                            .then(async message => {
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
                                                                                client.logger.debug(`Checking ${resp[0]._id}`)
                                                                                if (up < 3) {
                                                                                    lost();
                                                                                } else if (up >= down * 2) {
                                                                                    won();
                                                                                } else if (up == down) {
                                                                                    won();
                                                                                } else {
                                                                                    lost();
                                                                                }
                                                                                async function won() {
                                                                                    message.reactions.removeAll();
                                                                                    message.edit(client.suggestioneend(message, client.users.cache.get(resp[0].author), resp[0].suggestion, "won", up, down, resp[0]._id))
                                                                                    message.guild.channels.cache.get(config["approved-channel"]).send(client.suggestioneend(message, client.users.cache.get(resp[0].author), resp[0].suggestion, "won", up, down, resp[0]._id)).then(msg => {
                                                                                        handle.dbupdate(resp[0].id, { expires: "expired", approved: true, apprmsgid: msg.id, upvotes: up, dowvotes: down })
                                                                                    })
                                                                                }
                                                                                async function lost() {
                                                                                    message.reactions.removeAll();
                                                                                    message.edit(client.suggestioneend(message, client.users.cache.get(resp[0].author), resp[0].suggestion, "lost", up, down, resp[0]._id))
                                                                                    handle.dbupdate(resp[0].id, { expires: "expired", upvotes: up, dowvotes: down })
                                                                                }
                                                                            })
                                                                        }).catch(e => {
                                                                            client.logger.debug(e)
                                                                        })
                                                                    }
                                                                }
                                                            })
                                                            .catch(e => {
                                                                client.logger.debug(e)
                                                            })
                                                    }
                                                }
                                            }
                                        })
                                    } catch (e) {
                                        client.logger.debug(e)
                                    }
                                }
                            }
                        }
                    }
                    i++
                }
                if (i == k + 1) {
                    client.logger.log(`Checked all ${k} suggestion messages in guild "${guildname}" [${guildid}] successfully.`)
                }
            })
    }

    client.newsuggestion = (message, text, expires, id, edit) => {
        const { MessageEmbed } = require('discord.js');
        const { format } = require('date-fns');
        const embed = new MessageEmbed()
            .setTitle("New Suggestion")
            .setThumbnail(message.author.avatarURL())
            .addField(
                "**Instructions**",
                `Please vote with :white_check_mark: or :x: to either let it go through or cancel it.`
            )
            .addField("**Time till vote ends:**", `${expires}`)
            .setFooter(id)
            .setColor(config.colors.defaultembed)
            .setTimestamp()
        if (edit) {
            embed.setDescription(`Submitted by: ${message.author}\`\`\`${text}\`\`\` [(edited)](https://dontclick.this/ "${format(Date.now(), 'EEEE dd/MM/yyyy | H:m BBBBB')}")`)
            return embed;
        } else if (!edit) {
            embed.setDescription(`Submitted by: ${message.author}\`\`\`${text}\`\`\``)
            return embed;
        }
        return embed;
    }


    client.suggestioneend = (message, author, text, opt, up, down, id) => {
        const { MessageEmbed } = require('discord.js');
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


    client.commentedembed = (message, author, text, opt, up, down, comments, id) => {
        const { MessageEmbed } = require("discord.js");
        const { format } = require('date-fns')
        const embed = new MessageEmbed()
            .setTitle(`This suggestion ${opt}.`)
            .setThumbnail(author.avatarURL())
            .addField(`**Votes:**`, ` 👍  **${up}**  👎  **${down}** `)
            .setTimestamp()
            .setFooter(id)
        console.log(comments)
        for (const index in comments) {
            console.log(comments[index])
            if (comments[index].display) {
                var authorstring = `${client.users.cache.get(comments[index].author)} \n<:submitted:721094503556972545> [${format(comments[index].systime, 'dd/MM/yyyy')}](https://dontclick.this/ "${format(comments[index].systime, 'dd/MM/yyyy | hh:mm aaaa')}")`

                if (comments[index].edited) {
                    authorstring += `\n<:edited:721094276297129995> [${format(comments[index].lastedit, 'dd/MM/yyyy')}](https://dontclick.this/ "${format(comments[index].lastedit, 'dd/MM/yyyy | hh:mm aaaa')}")`
                }

                embed.addField(comments[index].content, authorstring, true)
            }
        }
        if (opt == "won") {
            embed.setColor(config.colors.approvedembed)
            embed.setDescription(`Submitted by: ${author}\`\`\`${text}\`\`\`Posted in: ${message.guild.channels.cache.get(config["approved-channel"])}`);
        } else if (opt == "lost") {
            embed.setColor("RED")
            embed.setDescription(`Submitted by: ${author}\`\`\`${text}\`\`\``);
        }
        return embed;
    };



    client.editapprovedsuggestion = (message, channel, author, text, opt, up, down, comments, id, msgid) => {

        channel.messages.fetch(msgid)
            .then(async msg => {
                msg.edit(client.commentedembed(message, author, text, opt, up, down, comments, id))
            })
            .catch(error => {
                client.logger.deubg(error)
            });


    }


}