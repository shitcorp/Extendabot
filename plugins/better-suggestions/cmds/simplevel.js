exports.run = async (client, message, args, level) => {

    const { MessageEmbed } = require('discord.js')

    async function simpBuilder(user, author, bias) {

        let whites = '⬜'
        let reds = '🟥'
        let output = [];
        let endcolor;

        let slevel = Math.floor(Math.random() * (100 - 0) + 0);
        
        
        if (bias) {
            slevel = bias;
        }

        if (slevel >= 50) { endcolor = "RED" } else { endcolor = "FFFFFF" }
        console.log(slevel >50)
        let smallvl = Math.floor(slevel / 5);
        let remain = 20 - smallvl


        for (let i = 0; i < smallvl; i++) {
            output.push(reds);
        }
        for (let j = 0; j < remain; j++) {
            output.push(whites);
        }

        const embed = new MessageEmbed()
            .setColor(endcolor)
            .setTitle(`${user.username}'s Simp Level ${slevel}%`)
            .setDescription(`${output.join('')}`)
            .setFooter(`Requested by ${author.username}`, author.avatarURL())
            .setTimestamp()

        return embed;
    }

  

    let tosend;
    if (!message.mentions.users.first()) {
        tosend = await simpBuilder(message.author, message.author)
    } else {
        let other = message.mentions.users.first()
        if(other.bot) return message.channel.send(client.error("Bots cant simp for you..."))
        if(other.id === "635562759949385760" || other.id === "686669011601326281"){
            tosend = await simpBuilder(other, message.author, "2")
        } else if (message.flags[0] && message.member.hasPermission("ADMINISTRATOR")) {
            message.delete().catch(console.error())
            tosend = await simpBuilder(other, message.author, message.flags[0])
        } else {
            tosend = await simpBuilder(other, message.author)
        }
    }
    message.channel.send(tosend)


}