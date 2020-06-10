const config = require("./config.json");
const usercache = new Set();
const { MessageEmbed } = require('discord.js')

exports.init = async (client) => {

  require("./util/funcs")(client);
  let handler = require('./util/db')
  await handler.dbinit();
 

}

exports.plugin = {
  name: "better-suggestions",
  version: "1.0.0",
  events: {
    ready: {
      run: async (client) => {
        var CronJob = require('cron').CronJob;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  Better Suggestions is ready.")
        var job = new CronJob('0 */7 * * * *', function() {
          
          client.voteend("589958750866112512", "632275715391225865");
          client.logger.ready(`Checked all suggestions successfully.`)
          client.logger.log(`You should see this every 10 minutes.`)

        }, null, true, 'America/Los_Angeles');
        job.start();
        client.logger.log(`Cron job started.`)
      }
    },
    message: {
      run: async (client, message) => {
        
        config.keywords.forEach((keyword) => {
        
          if (message.content.toLowerCase().startsWith(`${keyword}`)) {
        const args = message.content.slice(keyword.length).trim().split(/ +/g);
        message.flags = [];
        while (args[0] && args[0][0] === "-") {
          message.flags.push(args.shift().slice(1));
        }
        console.log(message.flags)
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
                  msg.delete({ timeout: 60000 }).catch(console.error);
                });
            } else {
              
              const rawargs = args;
              //rawargs.shift();
              const cmd = require("./cmds/add");
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
              }, 60000 * config["cooldown-in-minutes"]);
            }
          }
        });
      },
    },
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
          const cmd = require("./cmds/add");
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
    stats: {
      run: async (client, message, args, level) => {
        let cmd = require('./cmds/edit')
        try {
          cmd.run(client, message, args, level)
        } catch(e) {
          console.error(e)
        }
      },
      conf: {
        enabled: true,
        guildOnly: true,
        aliases: [],
        permLevel: "STAFF",
      },
      help: {
        name: "stats",
        category: "Utility",
        description: "This is a creative text, dont mind me",
        usage: "Returns your statistics.",
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
