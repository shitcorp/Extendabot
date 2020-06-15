exports.run = async (client, message, args, level) => {

    const { dbupdate, dbfindbyid, configget } = require("../util/db");
    const { formatDistance, format } = require('date-fns')
    const config = require('../config.json')
    const cconfig = await configget(message.guild.id)

    if (!message.flags[0]) return message.channel.send(client.error(`Please specify a suggestion to edit. Get the ID from the Footer of your suggestion message.`))

    try {
        dbfindbyid(message.flags[0]).then((res) => {
            if (!res[0]) return message.channel.send(client.error(`This suggestion does not seem to exist.`)).then(msg => msg.delete({timeout: 60000}).catch(console.error))
            if (res[0].expires == "expired") return message.channel.send(client.error(`The vote for this suggestion is already over.`)).then(msg => msg.delete({timeout: 60000}).catch(console.error))
            if (!args[0]) return message.channel.send(client.error(`Please enter a new suggestion text.`)).then(msg => msg.delete({timeout: 60000}).catch(console.error))
            let newtext = args.join(' ')
            dbupdate(message.flags[0], { suggestion: newtext })
            message.channel.send(client.success(`Updated your suggestion.`)).then(msg => msg.delete({timeout: 60000}).catch(console.error))
            message.guild.channels.cache.get(cconfig[0].suggestions_channel).messages.fetch(res[0].msgid)
            .then(messg => {
                const stringo = `${ formatDistance(new Date(), parseInt(res[0].expires) ) }`
                messg.edit(client.newsuggestion(message, newtext, `~ ${stringo}  (${format(parseInt(res[0].expires), "dd/MM/yyyy | H:m BBBB")})`, message.flags[0], "true"))
            })
            .catch(e => {
                message.channel.send(client.error(`There was an error trying to edit your suggestion: \n\`\`\`${e}\`\`\`\nShow this to the developers`)).then(msg => msg.delete({timeout: 60000}).catch(console.error))
            })
        });
    } catch(e) {
        console.error(e)
    }

}