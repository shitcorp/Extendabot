exports.plugin = {
  name: "better-suggestions",
  version: "1.0.0",
  events: {
    message: {
      run: async (client, message) => {
        console.log(message.id);
      },
    },
    ready: {
        run: async () => {
        console.log("a")
        }
    }
  },
  cmds: {
    suggest: {
      run: async (client, message, args, level) => {
        const cmd = require("./cmds/suggest");
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