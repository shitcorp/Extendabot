const Discord = require('discord.js')
const convert = require('convert-units')
const msgdel = 30000

exports.run = (client, message, args, level) => {

    if (message.flags[0] === "p" && args[0]) {

        if (!args[0]) return message.channel.send(client.warning(`Please specify a Unit!`)).then(msg => {
            msg.delete(msgdel).catch(error => {
            })
        })

        try {

            let pos = convert().from(args[0]).possibilities()
            let posdet = convert().describe(args[0])
            let output = `Possible conversions for \`${posdet.singular}\`: \n`;

            pos.forEach(possibility => {

                let detail = convert().describe(possibility)

                output += `> • \`${possibility}\` (${detail.singular}) \n`

            })

            message.channel.send(output)

        } catch (e) {

            message.channel.send(client.error(`An error occurred while trying to look up \`${args[0].toUpperCase()}\` \n` + "```" + e + "```"))

        }
    
    
    } else if (args[0] && args[1] && args[2] && !message.flags[0]) {


        try {


            let converted = convert(args[2]).from(args[0]).to(args[1])

            let convertedem = new Discord.RichEmbed()

                .setColor("#2C2F33")
                .setDescription("```" + args[2] + args[0] + " are equal to: " + converted + args[1] + "```")

            message.channel.send(convertedem)

        } catch (er) {

            //console.error(er)
            message.channel.send(client.error("There was an error trying to convert from: `" + args[0].toUpperCase() + "` to `" + args[1].toUpperCase() + "`\n```" + `${er}` + "```")).then(msg => {
                msg.delete(msgdel).catch(error => {})
            })

        }

    } else {

        let arg = ['convert']
        let cmd = client.commands.get('help')
        if (!cmd) return
        message.channel.send(client.warning(`Something went wrong here's the command usage for you:`)).then(msg => {
            msg.delete(msgdel).catch(error => {})
        })
        cmd.run(client, message, arg, level)

    }

}