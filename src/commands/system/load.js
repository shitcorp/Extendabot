const Discord = require('discord.js')
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars




    if (args[0]) {

        // TODO check if plugin exists
        // TODO make reload and unload method

        if (client.plugins.get(args[0])) return message.channel.send(client.error("```" + `This plugin is loaded already!` + "```"))

        client.pluginloader(args[0]);

        message.channel.send(client.success("\n" + "```" + `Loaded: [${args[0]}]\n` + "```"))

    }

    if (!args[0] && message.flags[0] === "a" || message.flags[0] === "all") {
        message.channel.send("Loading . . .").then(async msg => {
            var path = "../TODO BOT/plugins"
            await readdir(path, function (err, items) {
                let output = "";
                for (var i = 0; i < items.length; i++) {
                    //console.log(items[i]);
                    if (client.plugins.get(items[i])) return
                    client.pluginloader(items[i])
                    let name = items[i].replace(".js", "")
                    output += `Loaded: [${name}]\n`
                }
                msg.edit(client.success("\n" + "```" + output + "```" + "\n\nFor more information about a certain plugin run: \n> \`plugman -i PLUGINNAME\`"))
            })
        })

    }




};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "STAFF"
};

exports.help = {
    name: "load",
    category: "System",
    description: "Plugin load command. Mainly used for testing purposes or to load plugins while the bot is running.",
    usage: `load`
};