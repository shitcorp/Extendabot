const config = require('../config/config.json')

exports.run = (client, message) => {

    if (message.content.toLowerCase().startsWith(`hi im`) || message.content.toLowerCase().startsWith(`hi i'm`)) {
        let arr = message.content.split(" ")
        arr.shift()
        arr.shift()
        let finale = arr.join(" ")
        return message.channel.send(`Hi ${finale}, ${config.content}`)
    }

}