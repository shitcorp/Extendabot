exports.run = (client, message, args, level) => {

//if (message.channel.id != config.commandchannel) return;
if (!args[0]) return message.reply(client.error(`You forgot to give an actual suggestion.`)).then(msg => msg.delete(60000).catch(console.error));

const Discord = require('discord.js')
const config = require('../config.json')



  message.reply(`Thank you for your suggestion it has been posted in ${message.guild.channels.get(config["suggestions-channel"]).toString()}`).then(msg => {
        try {
            msg.delete(60000);
        } catch(e) {
            client.logger.debug(error)
        }
  })
  const texto = args.join(' ')
  var embed = new Discord.RichEmbed()
    .setColor(config.colors.defaultembed)
    .setTitle("New Suggestion")
    .setThumbnail(message.author.avatarURL)
    .addField("**Suggestion:**", "```" + texto + "```")
    .addField("**Suggested by:**", message.author.tag)
    .setDescription(`Please vote with :white_check_mark: or :x: to either let it go through or cancel it. \n\n __**You all have ${config["vote-timeout-in-minutes"]} minutes.**__`);
  client.channels
    .get(config["suggestions-channel"])
    .send(embed).then(voteMsg => {
        voteMsg.react("✅").then( voteMsg.react("❌"));
  setTimeout(function () {
    var reactions = voteMsg.reactions.array();
    var yesreaction = reactions[0];
    var noreaction = reactions[1];
    if (yesreaction.count > noreaction.count) {
      message.reply("The vote is over and your suggestion has been approved.");
      var newEmbed = new Discord.RichEmbed()
        .setColor(config.colors.approvedembed)
        .setTitle("New Suggestion")
        .addField("**Suggestion:**", "```" + texto + "```")
        .addField("**Suggested by:**", message.author)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
      client.channels.get(config["approved-channel"]).send(newEmbed);
    } else if (noreaction.count > yesreaction.count) {
      message.reply(
        "Unfortunately the vote is over and your suggestion lost."
      );
    } else if (noreaction.count == yesreaction.count) {
      message.reply(
        "> It was a tie! That's cool. It's gonna go through in that case."
      );
      var newembed = new Discord.RichEmbed()
        .setColor(config.colors.approvedembed)
        .setTitle("New Suggestion")
        .addField("**Suggestion:**", "```" + texto + "```")
        .addField("**Suggested by:**", message.author)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
      //send to approved suggestions channel
      //TODO: APPROVED CHANNEL IN DB UND APPROVEDCHANNEL COMMAND MACHEN DU HURENSOHN!
      client.channels.get(config["approved-channel"]).send(newembed);
    }
  }, 60000*config["vote-timeout-in-minutes"]); //1800000
})
};