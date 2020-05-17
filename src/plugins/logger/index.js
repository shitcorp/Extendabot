const config = require('./data/config.json')
const embeds = require('./data/embeds')
exports.plugin = {
    name: "Logger",
    desc: "Offers some logging capabilities.",
    version: "2.0.2",
    events: {
        guildMemberAdd: {
            run: async (client, member) => {
                if (config["logging-enabled"] !== "true" && config["member-logging"] !== "true") return
                let chan = member.guild.channels.get(config.loggingchannel)
                if (!chan) return
                let date = new Date(Date.now())
                chan.send(embeds.memberjoin(`__**User:**__  \n\`\`\` ${member.user.username}#${member.user.discriminator} \`\`\` \n__**Joined:**__ \n\`\`\`${date} \`\`\``, member))
            }
        },
        guildMemberRemove: {
            run: async (client, member) => {
                if (config["logging-enabled"] !== "true" && config["member-logging"] !== "true") return
                let chan = member.guild.channels.get(config.loggingchannel)
                if (!chan) return
                let date = new Date(member.joinedTimestamp)
                chan.send(embeds.memberleave(`__**User:**__  \n\`\`\` ${member.user.username}#${member.user.discriminator} \`\`\` \n__**Joined:**__ \n\`\`\`${date} \`\`\``, member))
            }
        },
        messageReactionAdd: {
            run: async (client, messageReaction, user) => {
                console.log(user.username)
            }
        },
        messageReactionRemove: {
            run: async (client, messageReaction, user) => {
                console.log(user.username)
            }
        },
        message: {
            run: async (client, message) => {
                console.log(message.id)
            }
        },
        messageDelete: {
            run: async (client, message) => {
                if (message.content) {
                    console.log(message.content)
                }
            }
        },
        messageUpdate: {
            run: async (client, oldMessage, newMessage) => {
                console.log(oldMessage.content, newMessage.content)
            }
        },
        roleCreate: {
            run: async (client, role) => {
                if (config["logging-enabled"] !== "true" && config["guild/role-logging"] !== "true") return
            }
        },
        roleUpdate: {
            run: async (client, oldRole, newRole) => {
                console.log(oldRole.name, newRole.name)
            }
        },
        roleDelete: {
            run: async (client, role) => {
                console.log(role.name)
            }
        },
        presenceUpdate: {
            run: async (client, oldMember, newMember) => {
                //console.log(newMember)
            }
        },
        guildUpdate: {
            run: async (client, oldGuild, newGuild) => {
                console.log(newGuild.name)
            }
        }
    },
    conf: {
        version: "1.0",
        perms: ['ADMINISTRATOR'],
        repo: "",
        author: "MeerBiene#7060",
        authordiscordid: "686659882551607346"
    },
    help: {
        name: "Logger",
        desc: "Logging module.",
        category: "LOGGING"
    }
}