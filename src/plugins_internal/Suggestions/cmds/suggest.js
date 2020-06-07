const Discord = require('discord.js')
const config = require('../config/config.json')
const msgdel = 30000

exports.run = (client, message, args, level) => {

    if (!args[0]) return message.channel.send(client.warning(`Please enter a suggestion text.`)).then(msg => {
        msg.delete(30000).catch(error => {  })
    })

    let checkchan = message.guild.channels.get(config.suggestionchannel)

    if (!checkchan) return client.logger.warn(`Your suggestion channel does not seem to exist. Please check your config for correctness.`)

    try {

        let text = args.join(" ")
        let sembed = new Discord.RichEmbed()
            .setTitle("New Suggestion:")
            .setColor(config.embedcolor)
            .setDescription("> " + text)
            .setFooter(`suggested by: ${message.author.tag}`, message.author.avatarURL)
        if (config.timestamp) sembed.setTimestamp()

        checkchan.send(sembed).then(async msg => {

            if (config.reactions === "ARROWS" || config.reactions === "ARROW") {

                await msg.react("⬆️")
                await msg.react("⬇️")

            } else if (config.reactions === "THUMBS" || config.reactions === "THUMB") {

                await msg.react("👍")
                await msg.react("👎")

            }

        })

    } catch (e) {
        return client.logger.warn(`It seems as if the bot cant post in your suggestions channel. `)
    }

}