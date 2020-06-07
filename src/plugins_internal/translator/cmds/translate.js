const Discord = require('discord.js')
const language = require("../data/languages.json");
const translate = require('google-translate-open-api').default;


exports.run = async (client, message, args, level) => {
    // Specifies the text's language.get and translates it into a specific language.get
    

    if (args.length < 3) {
        message.reply("Wrong format: An example would be `" + `${realsettings[0].prefix}translate swedish korean swedish-text-here` + "` where after `" +  `${realsettings[0].prefix}translate` + "` would translate the `swedish-text-here` into korean");
    } else {
        //return console.log(language.get + "\n\n\n" + language.get[0]);
        let argFrom = args[0].toLowerCase();
        let argTo = args[1].toLowerCase();
        // /*/
        let lang_from;
        var foundFrom = false;
        var foundTo = false;
        let lang_to;
        for (var i = 0 in language.get) {
            if (args[0] == language.get[i]["abrv"]) {
                // do the translate dance
                lang_from = language.get[i]["abrv"]
                foundFrom = true;
            } else if (args[0] != language.get[i]["abrv"]) {
                i + 1
            }
        }
        for (var i = 0 in language.get) {
            if (args[1] == language.get[i]["abrv"]) {
                lang_to = language.get[i]["abrv"]
                foundTo = true;
            } else {
                i + 1
            }
        }
        if (foundFrom == false && foundTo == false) {
            // scan for name instead of abbreviation.
            for (var i = 0 in language.get) {
                if (args[0] == language.get[i]["name"]) {
                    // do the translate dance
                    lang_from = language.get[i]["abrv"]
                    foundFrom = true;
                } else if (args[0] != language.get[i]["name"]) {
                    i + 1
                }
            }
            for (var i = 0 in language.get) {
                if (args[1] == language.get[i]["name"]) {
                    lang_to = language.get[i]["abrv"]
                    foundTo = true;
                } else {
                    i + 1
                }
            }
        }
        if (foundFrom == false || foundTo == false) return message.reply("An invalid language.get was specified.");
        let text = args.slice(2).join(' ');
        const result = await translate(text, {
            from: lang_from,
            to: lang_to
        });
        const data = result.data[0];
        const embed = new Discord.RichEmbed()
        embed.setColor("BLUE")
        embed.setTitle(message.member.displayName + "#" + message.author.discriminator)
        embed.setThumbnail(message.author.avatarURL)
        embed.setDescription("> Translated from `" + args[0].toUpperCase() + "` to `" + args[1].toUpperCase() + "` for " + message.member + "\n> " + "```" + result.data + "```")
        embed.setFooter("Translated by " + message.client.user.username, message.client.user.avatarURL)
        embed.setTimestamp()
        message.channel.send(embed);

        //message.channel.send("> Translated from `" + lang_from + "` to `" + lang_to + "` for <@" + message.member + ">\n**" + result.data + "**");
    }

}
