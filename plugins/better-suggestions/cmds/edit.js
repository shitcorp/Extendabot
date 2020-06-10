exports.run = async (client, message, args, level) => {

    const { dbfindbyid } = require("../util/db");

    //if (!args[0]) return message.channel.send(client.error(`Please specify a suggestion to edit. Get the ID from the Footer of your suggestion message.`))

    try {
        dbfindbyid(args[0]).then((res) => {
          console.log(res)
            if (!res[0]) return message.channel.send(client.error(`This suggestion does not seem to exist.`)).then(msg => msg.delete({timeout: 60000}).catch(console.error))
            
        });
    } catch(e) {
        console.error(e)
    }

}