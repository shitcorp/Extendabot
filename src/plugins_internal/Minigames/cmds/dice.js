const config = require('../config/config.json')
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {

    const rollDice = () => Math.floor(Math.random() * 6) + 1
    await message.reply("rolled a 🎲 and got `#" + rollDice() +"`!");

}