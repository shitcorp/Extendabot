const Discord = require("discord.js");

exports.init = (client) => {
    
}

exports.plugin = {
    name: "Greeter",
    version: "1.0",
    events: {
        guildMemberAdd: {
            run: async (client, member) => {
                const config = require("./Data/config.json");
                if (!config.greetingmessage.embed) {
                    let message = config.greetingmessage.message.replace("%USER%", member.username).replace("%SERVERNAME%", member.guild.name);
                    if (!config.dm) {
                        if (config.channel === "ID_HERE") return client.logger.warn("DMs are set to false but greeting-channel is not configured!");
                        let check = member.guild.channels.get(config.channel);
                        if (!check) return client.logger.warn("Greeting-channel is unvalid!");
                        return check.send(message);
                    }
                    return member.send(message).catch(error => {})
                } else {
                    let embedProp = config.greetingmessage.embedProp;
                    let embed = new Discord.RichEmbed();
                    if (embedProp.title) embed.setTitle(embedProp.title)
                    if (embedProp.description) { 
                        let desc = embedProp.description.replace("%USER%", member.username).replace("%SERVERNAME%", member.guild.name);
                        embed.setDescription(desc);
                    }
                    for (let field in config.greetingmessage.fields) {
                        if (embedProp.fields.hasOwnProperty(field)) {
                            let value = embedProp.fields[field];
                            embed.addField(field, value);
                        }
                    }
                    if (embedProp.color) embed.setColor(embedProp.color);
                    if (embedProp.thumbnail) embed.setThumbnail(embedProp.thumbnail);
                    if (embedProp.footer.message) embed.setFooter(embedProp.footer.message);
                    if (embedProp.footer.timestamp) embed.setTimestamp();
                    if (embedProp.image) embed.setImage(embedProp.image);
                    if (embedProp.author.image && embedProp.author.name) embed.setAuthor(embedProp.author.name, embedProp.author.image);
                    if (!config.dm) {
                        if (config.channel === "ID_HERE") return client.logger.warn("DMs are set to false but greeting-channel is not configured!");
                        let check = member.guild.channels.get(config.channel);
                        if (!check) return client.logger.warn("Greeting-channel is unvalid!");
                        if (!embedProp.message) return check.send(embedProp.message, embed);
                        return check.send(embed);
                    }
                    if (!embedProp.message) return member.send(embedProp.message, embed).catch(error => {});
                    return member.send(embed).catch(error => {});
                }
            }
        }
    },
    conf: {
        version: "1.0",  // BOT version
        perms: ['READ_MESSAGES', 'SEND_MESSAGES'],  // perms the bot needs to execute this plugin
        repo: "http://github.com", // to display if error happens
        author: "MickMMars#0666",
        authordiscordid: "280798475946426369"
    },
    help: {
        // This info will be displayed in the global pluginmanager command
        name: "Greeter",
        desc: "This plugin will greet people on your discord!",
        category: "Utility"
    }
}