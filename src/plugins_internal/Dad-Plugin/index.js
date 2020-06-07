exports.plugin = {
    name: "Dad Plugin",
    version: "1.0",
    events: {
      message: {
          run: async (client, message) => {
              let eventfile = require('./events/message')
              eventfile.run(client, message)
          }
      }
    },
    conf: {
        version: "1.0",  // BOT version
        perms: [],  // perms the bot needs to execute this plugin
        repo: "http://github.com/", // to display if error happens
        author: "MeerBiene#7060",
        authordiscordid: "686669011601326281"
    },
    help: {
        // This info will be displayed in the global plugin manager command
        name: "Dad Plugin",
        desc: "Makes epic dad jokes.",
        category: "Fun"
    }
}