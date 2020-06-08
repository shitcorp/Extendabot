
const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const chalk = require("chalk")


const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});


client.config = require("./config.js");

client.logger = require("./src/modules/Logger");

//TODO: make new dbhandler
//require("./modules/dbhandler.js")(client);
require("./src/modules/functions.js")(client);
require("./src/modules/embeds.js")(client);
require("./src/modules/plugman.js")(client);


client.commands = new Enmap();
client.aliases = new Enmap();
client.plugins = new Enmap();



const init = async () => {
  
    async function load() {
      
       
      

      const cmdFilesFun = await readdir(`./src/commands/`);
      let amount = cmdFilesFun.length
      client.logger.log(`[COMMANDS: ${chalk.green(amount)}]`);
      cmdFilesFun.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = client.loadCommand(f);
        if (response) console.log(response);
      
      });
    }


    async function allplugins() {

      var path = "./plugins"
      await readdir(path, function (err, items) {
        let amount = items.length  
        client.logger.log(`${chalk.bgBlue("[PLUGMAN]")} Loading ${chalk.green(amount)} plugins:`);
        for (var i = 0; i < amount; i++) {
              if (client.plugins.get(items[i])) return
              let name = items[i]
              
              client.pluginloader(items[i])
        }
        client.logger.log(`${chalk.bgBlue("[PLUGMAN]")} Finished loading ${chalk.green(amount)} plugins!`);
      })

    }
  
    
  
    
  
  
  
  
    const evtFiles = await readdir("./src/events/");
    let amount = evtFiles.length
    client.logger.log(`${chalk.bgBlue("[EVENTS]")} Loading ${chalk.green(amount)} events.`);
    evtFiles.forEach(file => {
      const eventName = file.split(".")[0];
      client.logger.log(`[EVENT] Loading Event: ${eventName}`);
      const event = require(`./src/events/${file}`);
  
      client.on(eventName, event.bind(null, client));
    });
  
    
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
      const thisLevel = client.config.permLevels[i];
      client.levelCache[thisLevel.name] = thisLevel.level;
    }
  
  

   
  
    
  
    client.login(client.config.token);

    allplugins();

  
  
  module.exports = allplugins, load  
    
};
  
  init();

 