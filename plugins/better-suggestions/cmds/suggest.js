// TODO: fucking ratelimit

exports.run = (client, message, args, level) => {
try {
  message.delete()
} catch(e) {
  console.error(e)
}
//if (message.channel.id != config.commandchannel) return;
if (!args[0]) return message.reply(client.error(`You forgot to give an actual suggestion.`)).then(msg => msg.delete({timeout: 20000}).catch(console.error));

const Discord = require('discord.js')
const config = require('../config.json')



  message.reply(`Thank you for your suggestion it has been posted in ${message.guild.channels.cache.get(config["suggestions-channel"]).toString()}`).then(msg => {
        try {
            msg.delete({ timeout: 20000 });
        } catch(e) {
            client.logger.debug(e)
        }
  })
  const texto = args.join(' ')
  // TODO sanitize input for length
  var embed = new Discord.MessageEmbed()
    .setColor(config.colors.defaultembed)
    .setTitle("New Suggestion")
    .setThumbnail(
      message.author.avatarURL({ format: "gif", dynamic: true, size: 1024 })
    )
    .addField("**Suggestion:**", "```" + texto + "```")
    .addField("**Suggested by:**", message.author.tag)
    .setDescription(
      `Please vote with :white_check_mark: or :x: to either let it go through or cancel it. \n\n __**You all have ${config["vote-timeout-in-minutes"]} minutes.**__`
    );
  client.channels.cache
    .get(config["suggestions-channel"])
    .send(embed).then(voteMsg => {
        voteMsg.react("✅").then( voteMsg.react("❌"));
  setTimeout(function () {
    var reactions = voteMsg.reactions.cache.array();
    var yesreaction = reactions[0];
    var noreaction = reactions[1];
    console.log(yesreaction, noreaction)
    if (yesreaction.count > noreaction.count) {
      message
        .reply(
          `The vote is over and your suggestion \`\`\`${texto} \`\`\`has been approved.`
        )
        .then((msg) => {
          msg.delete({ timeout: 20000 }).catch(console.error);
        });
      var newEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.approvedembed)
        .setTitle("New Suggestion")
        .addField("**Suggestion:**", "```" + texto + "```")
        .addField("**Suggested by:**", message.author)
        .setThumbnail(
          message.author.avatarURL({ format: "gif", dynamic: true, size: 1024 })
        )
        .setTimestamp();
      client.channels.cache.get(config["approved-channel"]).send(newEmbed);
    } else if (noreaction.count > yesreaction.count) {
      message
        .reply("Unfortunately the vote is over and your suggestion lost.")
        .then((msg) => {
          msg.delete({ timeout: 20000 }).catch(console.error);
        });
    } else if (noreaction.count == yesreaction.count) {
      message.reply(
        `It was a tie! That's cool. Your suggestion: \`\`\`${texto} \`\`\`is gonna go through in that case.`
      ).then(msg => {
        msg.delete({timeout: 20000}).catch(console.error)
      });
      var newembed = new Discord.MessageEmbed()
        .setColor(config.colors.approvedembed)
        .setTitle("New Suggestion")
        .addField("**Suggestion:**", "```" + texto + "```")
        .addField("**Suggested by:**", message.author)
        .setThumbnail(
          message.author.avatarURL({ format: "gif", dynamic: true, size: 1024 })
        )
        .setTimestamp();
      //send to approved suggestions channel
      //TODO: APPROVED CHANNEL IN DB UND APPROVEDCHANNEL COMMAND MACHEN DU HURENSOHN!
      client.channels.cache.get(config["approved-channel"]).send(newembed);
    }
  }, 60000*config["vote-timeout-in-minutes"]); //1800000
})
};