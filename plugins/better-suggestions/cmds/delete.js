exports.run = async (client, message, args, level) => {

    const { dbupdate, dbfindbyid } = require("../util/db");
    const { formatDistance, format } = require('date-fns')
    const config = require('../config.json')



    if (!message.flags[0]) return message.channel.send(client.error(`Please specify a suggestion to edit. Get the ID from the Footer of your suggestion message.`))

    try {
        dbfindbyid(message.flags[0]).then((res) => {
            if (!res[0]) return;
            // TODO: delete suggestion command
        })
    } catch(e) {
        message.channel.send(client.error(`There was an error, show this to the developer(s): \n \`\`\`${e}\`\`\``))
    }


}