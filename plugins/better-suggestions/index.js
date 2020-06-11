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
        //client.guilds.cache.get("589958750866112512").channels.cache.get("720546517949349938").send(`Isnt Friday tomorrow?`)
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  Better Suggestions is ready.")
        client.guilds.cache.forEach(guild => {
          
          var CronJob = require('cron').CronJob;
          var job = new CronJob('0 */10 * * * *', function() {
            
            client.logger.log(`Starting suggestioncheck`)
            client.voteend(guild.id, "600812135882293249");
  
          }, null, true, 'America/Los_Angeles');
          job.start();
          client.logger.ready(`Cron job started.`)


        })
        
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
        
            if (usercache.has(message.author.id)) {
              message.delete().catch(console.error);
              return message
                .reply(
                  client.error(
                    `\`\`\`You are on a cooldown right now. Please wait at least ${
                      config["cooldown-in-minutes"]-1
                    } minute(s) before submitting another suggestion.\`\`\` \n>  **(!)** Remember: You can edit suggestions by doing ${client.config.prefix}edit -SUGGESTIONID <NEWTEXT>.`
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
    config: {
      run: async (client, message, args, level) => {
        
          const cmd = require("./cmds/comment");
          try {
            cmd.run(client, message, args, level);
          } catch {
            console.error;
          }
        
      },
      conf: {
        enabled: true,
        guildOnly: true,
        aliases: ["goodbye"],
        permLevel: "STAFF",
      },
      help: {
        name: "config",
        category: "Utility",
        description: "This is a creative text, dont mind me",
        usage: "bye -> tells the world goodbye from you.",
      },
    },
    edit: {
      run: async (client, message, args, level) => {
        let cmd = require('./cmds/edit')
        if (message.channel.id != config.commandchannel) return message.channel.send(client.error(`This command is only working in ${message.guild.channels.cache.get(config.commandchannel)}`)).then(msg => msg.delete({timeout: 60000}).catch(console.error));
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
