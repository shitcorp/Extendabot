const config = require("./config.json");
const usercache = new Set();
const { MessageEmbed } = require('discord.js')

exports.init = async (client) => {

  require("./util/funcs")(client);

}

exports.plugin = {
  name: "better-suggestions",
  version: "1.0.0",
  events: {
    message: {
      run: async (client, message) => {
        console.log(message.flags)
        config.keywords.forEach((keyword) => {
          if (message.content.toLowerCase().startsWith(`${keyword}`)) {
            if (usercache.has(message.author.id)) {
              message.delete().catch(console.error);
              return message
                .reply(
                  client.error(
                    `\`\`\`You have a pendig suggestion going right now. Please wait at least ${config["cooldown-in-minutes"]-1} minute(s) before submitting another suggestion.\`\`\` \n>  **(!)** Remember: You can only have one pending suggestion at the time.`)
                )
                .then((msg) => {
                  msg
                    .delete({ timeout: 60000 })
                    .catch(console.error);
                });
            } else {
              const rawargs = message.content.split(" ");
              rawargs.shift();
              const cmd = require("./cmds/suggest");
              try {
                if (!rawargs[0])
                  return message
                    .reply(
                      client.error(`You forgot to give an actual suggestion.`)
                    )
                    .then((msg) =>
                      msg.delete({ timeout: 20000 }).catch(console.error)
                    );

                const texto = rawargs.join(" ");
                if (texto.length > 955)
                  return message.channel
                    .send(
                      client.error(
                        `Your suggestion text was too long. You used \`${texto.length}\` out of \`955\` allowed characters. \nPlease try again.`
                      )
                    )
                    .then((msg) => {
                      msg.delete({ timeout: 60000 }).catch(console.error);
                    });
                cmd.run(client, message, rawargs);
                usercache.add(message.author.id);
              } catch {
                console.error;
              }
              usercache.add(message.author.id);
              setTimeout(async function () {
                usercache.delete(message.author.id);
              }, 60000*config["cooldown-in-minutes"]);
            }
          }
        });
      },
    },
    messageReactionAdd: {
      run: async (client, reaction, user) => {
        //console.log(reaction)
        if (reaction.partial) {
          try {
            await reaction.fetch();
          } catch(error) {
            console.error(error)
            return;
          }
        console.log(
          `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
        );
        console.log(
          `${reaction.count} user(s) have given the same reaction to this message!`
        );
        }
        
      }
    }
  },
  cmds: {
    suggest: {
      run: async (client, message, args, level) => {
        if (message.channel.id !== config.commandchannel) return;
        if (usercache.has(message.author.id)) {
          message.delete().catch(console.error);
          return message
            .reply(
              client.error(
                `\`\`\`You have a pendig suggestion going right now. Please wait at least ${
                  config["cooldown-in-minutes"] - 1
                } minute(s) before submitting another suggestion.\`\`\` \n>  **(!)** Remember: You can only have one pending suggestion at the time.`
              )
            )
            .then((msg) => {
              msg
                .delete({ timeout: 60000 * config["cooldown-in-minutes"] })
                .catch(console.error);
            });
        } else {
        const cmd = require("./cmds/suggest");
        try {
          cmd.run(client, message, args, level);
          usercache.add(message.author.id);
          setTimeout(async function () {
            usercache.delete(message.author.id);
          }, 60000 * config["cooldown-in-minutes"]);
        } catch {
          console.error;
        }
      }
      },
      conf: {
        enabled: true,
        guildOnly: true,
        aliases: ["goodbye"],
        permLevel: "STAFF",
      },
      help: {
        name: "suggest",
        category: "Utility",
        description: "This is a creative text, dont mind me",
        usage: "bye -> tells the world goodbye from you.",
      },
    },
  },
  conf: {
    version: "1.0.0", // BOT version
    perms: ["KICK_MEMBERS", "BAN_MEMBERS"], // perms the bot needs to execute this plugin
    repo: "http://github.com", // to display if error happens
    author: "MeerBiene#7060",
    authordiscordid: "686669011601326281",
  },
  help: {
    // This info will be displayed in the global pluginmanager command
    name: "better-suggestions",
    desc:
      "This is a very creative plugindescription, cause i want to see if the formatting worked properly.",
    category: "Utility",
  },
};
