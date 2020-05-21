const Discord = require('discord.js')
const randomPuppy = require("random-puppy");
const config = require('../config/config.json')

exports.run = async (client, message, args, level) => {

    const subReddits = config.meme.subreddits
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);
    const embed = new Discord.RichEmbed()
        .setColor("#2C2F33")
        .setImage(img)
        .setTitle(`From /r/${random}`)
        .setURL(img);

    message.channel.send(embed);

}