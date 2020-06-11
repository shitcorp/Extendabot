exports.run = async (client, message, args, level) => {

    const { dbupdate, dbfindbyid } = require("../util/db");
    const { formatDistance, format } = require('date-fns')
    const config = require('../config.json')

    if (!message.flags[0]) return message.channel.send(client.error(`Please specify a suggestion to edit. Get the ID from the Footer of your suggestion message.`))

    try {
        dbfindbyid(message.flags[0]).then((res) => {
          if (!res[0]) return message.channel.send(client.error(`This suggestion does not seem to exist.`))
          var text = args.join(' ')
          const comm = {
              author: message.author.id,
              content: text
          }
          dbupdate(res[0].id, { $push: {'comments': comm}})

          dbfindbyid(message.flags[0]).then(doc => {
              if (!doc[0]) return;
              message.channel.send(client.commentedembed(message, client.users.cache.get(res[0].author), res[0].suggestion, "won", 2, 2, doc[0].comments, message.flags[0]))
          })

        });
    } catch(e) {
        console.error(e)
    }

}