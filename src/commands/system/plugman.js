const Discord = require('discord.js')

const dateFormat = require('dateformat');

exports.run = async (client, message, args, level) => {


    const userMention = message.mentions.members.first() || message.guild.members.get(args[1]);
    const msgdel = client.config.msgdelete

    if (message.flags[0] === "v" || message.flags[0] === "view") {

        let output = "";
        let plugins = client.plugins
        let embed = new Discord.RichEmbed()
            .setTitle("Loaded Plugins:")
        plugins.forEach(pl => {
            console.log(pl.name)
            output = `> Desc: ${pl.help.desc} \n> Author: <@${pl.conf.authordiscordid}> \n> Category: ${pl.help.category}`
            if (pl.conf.repo) {
                output += `\n> Repo: [Click here](${pl.conf.repo})`
            }
            embed.addField(`__**${pl.name}**__  [v${pl.version}]`,output , true)

        })

        message.channel.send(embed)

    }


}



exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "root"
};

exports.help = {
    name: "plugman",
    category: "System",
    description: "Pluginmanager",
    usage: "plugman -v | Show all currently loaded plugins. \nplugman -i PLUGINNAME | Returns information about a certain plugin. \nplugman -l PLUGINNAME | Loads the plugin with the specified name."
};