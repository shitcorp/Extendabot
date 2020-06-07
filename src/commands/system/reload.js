exports.run = async (client, message, args, level) => {
  
    var allplugins = require('../../../index')
    var load = require('../../../index')

    await client.commands.clear();
    await client.aliases.clear();
    await client.plugins.clear();

    await allplugins();
    await load('system')
    

    message.channel.send(client.success(`Reload complete!`));





};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "STAFF",
};

exports.help = {
  name: "reload",
  category: "System",
  description:
    "Plugin reload command. Mainly used for testing purposes or to load plugins while the bot is running.",
  usage: `load`,
};
