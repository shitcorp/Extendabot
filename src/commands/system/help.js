const Discord = require('discord.js')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    
    //const settings = client.dbgetconfig(message)
    const msgdel = client.config.msgdelete

    if (args[0]) {
        if (client.commands.has(args[0])) {
            let command = client.commands.get(args[0]);
            let detailembed = new Discord.RichEmbed()
                .setTitle(`**Command Usage**`)
                .addField(`**Command:**`, `> ${args[0]}`)
                if (command.conf.aliases && command.conf.aliases.length > 0) {
                detailembed.addField(`**Aliases:**`, `> ${command.conf.aliases}`)
                }
                detailembed.addField(`**Description:**`, `> ${command.help.description}`)
                detailembed.addField(`**Usage:**`, `> ${command.help.usage}`)
                detailembed.setColor("#2C2F33")
                detailembed.setFooter(`requested by: ${message.author.username}#${message.author.discriminator}  -  this embed will kill itself in 1 minute.`, message.author.avatarURL)
            message.channel.send(detailembed).then(msg => {
                setTimeout(function () {
                    msg.delete().catch(error => {});
                }, 60000)
            })
        } else {
            message.channel.send(client.warning(`I'm sorry but it seems as if there is no such command named "${args[0]}"`)).then(msg => {
                msg.delete(msgdel).catch(error => {})
            })
        }
    } else if (!args[0]) return getAll(client, message, args, level)


    async function getAll(client, message, args, level) {




        const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true);
        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        let currentCategory = "";
        let arr = [];
        let output = "";
        let embed = new Discord.RichEmbed()
            .setThumbnail(client.user.avatarURL)
            .setTitle(`${message.guild.me.displayName}  -  Command List \n`)
            .addField(`ʀᴇᴀᴅ ᴍᴏʀᴇ`, "\n> Use help <commandname>" + "`" + "for details ")
            .setColor("#2C2F33")

        const sorted = await myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);
        sorted.forEach( c => {
            const cat = c.help.category
            if (currentCategory !== cat) {
                output += `\n __**${cat}:**__ \n`;
                currentCategory = cat;
            }
            output +=  " `" + `${c.help.name}` + "`" + `${" ".repeat(longest - c.help.name.length)} |`;
        });
        //${table.table(possibleInvites)}
        await embed.setDescription(`${output}`)
        message.channel.send(embed)
    }







};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "STAFF"
};

exports.help = {
    name: "help",
    category: "System",
    description: "Display available commands and their usage.",
    usage: `help`
};