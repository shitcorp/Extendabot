const Discord = require('discord.js')
module.exports = {


    log: function (desc) {
        const embed = new Discord.RichEmbed()
        .setTitle(`Logging`)
        .setDescription(desc)
        return embed
    },

    memberjoin: function (desc, member) {
        const membed = new Discord.RichEmbed()
        .setTitle(`Member Join`)
        .setThumbnail(member.user.avatarURL)
        .setDescription(desc)
        .setColor("GREEN")
        .setTimestamp()
        return membed
    },

    memberleave: function (desc, member) {
        const membed = new Discord.RichEmbed()
        .setTitle(`Member Leave`)
        .setThumbnail(member.user.avatarURL)
        .setDescription(desc)
        .setColor("RED")
        .setTimestamp()
        return membed
    }


}