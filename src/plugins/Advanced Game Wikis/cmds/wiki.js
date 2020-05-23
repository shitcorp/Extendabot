const Discord = require('discord.js')
const config = require('../config/config.json')
const pages = config.pages

exports.run = (client, message, args, level) => {

    if (args[0] && !message.flags[0]) {

        for (page in pages) {
            if (pages.hasOwnProperty(page)) {
                let props = pages[page]

                if (page === args[0]) {

                    let embed = new Discord.RichEmbed()
                        .setColor(config.embedcolor)
                        .setTitle(args[0])
                        .setURL(props.link)

                    let output = `> [Click here](${props.link} "${args[0]}") to be taken to \`${args[0]}\``

                    if (props.desc) output += `\n\n > ${props.desc}`
                    if (props.image) embed.setImage(props.image)
                    if (props.thumbnail) embed.setThumbnail(props.thumbnail)

                    embed.setDescription(output)

                    message.channel.send(embed)

                }
            } else {
                let acmd = client.commands.get('wiki')
                if (!acmd) return
                message.flags[0] = "a"
                acmd.run(client, message, args, level)
                return
            }
        }

    } else if (!args[0] && message.flags[0] === "all" || message.flags[0] === "a") {

        let allembed = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle("All available Pages:")
            .setThumbnail(message.guild.iconURL)

        for (page in pages) {
            if (pages.hasOwnProperty(page)) {
                let props = pages[page]
                allembed.addField(`${page}`, `[ Click here ](${props.link})`, true)
            }
        }

        message.channel.send(allembed)

    } else {
        let hcmd = client.commands.get(`help`)
        if (!hcmd) return
        let arg = ['wiki']
        hcmd.run(client, message, arg, level)
    }


}