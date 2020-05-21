const Discord = require('discord.js')
const config = require('../config/config.json')

exports.run = async (client, message, args, level) => {

    if (!args[0]) { var args = ["Changed", "a", "light", "bulb", "without", "help"]; }
    var embed = new Discord.RichEmbed()
        .setColor(config.embedcolor)
        .setTitle(":star:  Achievement Unlocked")
        .setDescription("> " + args.join(" "));
    return message.channel.send(embed);

}