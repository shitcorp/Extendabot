const config = require("./config.json");
const usercache = new Set();

exports.init = async (client) => {

  require("./util/funcs")(client);

}

exports.plugin = {
  name: "better-suggestions",
  version: "1.0.0",
  events: {
    message: {
      run: async (client, message) => {
        config.keywords.forEach((keyword) => {
          if (message.content.toLowerCase().startsWith(`${keyword}`)) {
            if (usercache.has(message.author.id)) {
              message.delete().catch(console.error);
              return message
                .reply(
                  client.error(
                    `\`\`\`You have a pendig suggestion going right now. Please wait ${config["cooldown-in-minutes"]} minute(s) before submitting another suggestion.\`\`\` \n>  **(!)** You are on cooldown as long as you can see this message.`
                  )
                )
                .then((msg) => {
                  msg
                    .delete({ timeout: 60000*config["cooldown-in-minutes"] })
                    .catch(console.error);
                });
            } else {
              const rawargs = message.content.split(" ");
              rawargs.shift();
              const cmd = require("./cmds/suggest");
              try {
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
      run: async (reaction, user) => {
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
                `\`\`\`Please wait ${config["cooldown-in-minutes"]} minute(s) before submitting another suggestion.\`\`\` \n>  **(!)** You are on cooldown as long as you can see this message.`
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
    help: {
      run: async (client, message, args, level) => {
        message.channel.send(`Loading . . .`)
      },
      conf: {
        enabled: true,
        category: "Utility",
        description: "Display all commands.",
        usage: "help"
      },
      help: {

      }
    }
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
