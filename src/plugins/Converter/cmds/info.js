const Discord = require('discord.js')
const convert = require('convert-units')
const msgdel = 30000

exports.run = (client, message, args, level) => {

    if (!args[0]) return message.channel.send(client.warning(`Please specify a unit!`)).then(msg => { msg.delete(msgdel).catch(error => {  }) })

    try {
    
        var infoobj = convert().describe(args[0])

        let infoembed = new Discord.RichEmbed()
        .setColor("#2C2F33")
        .setTitle("```" + infoobj.singular.toUpperCase() + "```")
        .setDescription(`> Abbreviation: \`${infoobj.abbr}\` \n> Measure: \`${infoobj.measure}\` \n> System: \`${infoobj.system}\` \n> Singular: \`${infoobj.singular}\` \n> Plural: \`${infoobj.plural}\``)
        
        message.channel.send(infoembed)
    
    } catch(er) {

        message.channel.send(client.error("There was an error trying to fetch information about the unit: `" + args[0].toUpperCase() + "`\n```" + `${er}` + "```")).then(msg => {
            msg.delete(msgdel).catch(error => {})
        })
    
    }

}