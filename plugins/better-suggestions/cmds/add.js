exports.run = async (client, message, args, level) => {


  var handle = require('../util/db')
  const cconfig = await handle.configget(message.guild.id)
  const config = require('../config.json')
  const uniqid = require('uniqid');
  const systime = Date.now();












handle.configupdate(message.guild.id, { four: "twenty" })





  for (const key of cconfig) {
    console.log(key)
    console.log(key._id)
    console.log(key.four)
    console.log(key.votetimeout)
  }


  var expires = systime + 6000 * config["vote-timeout-in-minutes"]
  
  if (!message.flags[0]) {
    suggestionstarter()
  } else if (message.flags[0].includes("h")) {
    let toparse = message.flags[0].replace("h", "");
    let parsed = parseInt(toparse);

    if (parsed > 24) return message.channel
      .send(
        client.error(
          `Your vote timeout cant be greater than 24hrs.`
        )
      )
      .then((msg) => {
        msg.delete({ timeout: 60000 }).catch(console.error);
      });

    expires = systime + 3600000 * parsed;
    suggestionstarter()

  } else if (message.flags[0].includes("d")) {
    let toparse = message.flags[0].replace("d", "");
    let parsed = parseInt(toparse);
    if (parsed > config["max-vote-timeout-in-days"]) return message.channel.send(client.error(`Your vote timeout cannot be greater than ${config["max-vote-timeout-in-days"]} days.`)).then(msg => { msg.delete({ timeout: 60000 }).catch(console.error) })


    expires = systime + 86400000 * parsed;
    suggestionstarter()
  }

  async function suggestionstarter() {

    const suggestiontext = args.join(' ');

    if (suggestiontext.length > 1999)
      return message.channel
        .send(
          client.error(
            `Your suggestion text was too long. You used \`${suggestiontext.length}\` out of \`1999\` allowed characters. \nPlease try again.`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 60000 }).catch(console.error);
        });

    const suggestionID = uniqid();

    const suggestion = {
      _id: `${suggestionID}`,
      guildid: `${message.guild.id}`,
      suggestion: `${suggestiontext}`,
      author: `${message.author.id}`,
      systemtime: `${systime}`,
      approved: false,
      expires
    };

    const { formatDistance, format } = require('date-fns')


    const stringo = `${formatDistance(new Date(), expires)}`

    await handle.dbpush(suggestion)

    
    const chan = message.guild.channels.cache.get(cconfig[0].suggestions_channel)

    chan.send(client.newsuggestion(message, suggestiontext, `~ ${stringo}  (${format(expires, "dd/MM/yyyy | H:m BBBB")})`, suggestionID))
      .then(async (msg) => {
        await msg.react("✅")
        await msg.react("❌")
        handle.dbupdate(suggestionID, { msgid: `${msg.id}` });
      });

  }

}