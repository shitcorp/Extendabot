module.exports = (client) => { 

    client.loadCommand = (category, commandName) => {
        try {
          let name = category.toUpperCase()
          client.logger.log(`[${name}] Loading Command: ${commandName}`);
          const props = require(`../commands/${category}/${commandName}`);
          if (props.init) {
            props.init(client);
          }
          client.commands.set(props.help.name, props);
          props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
          });
    
          //console.log(client.commands)
          return false;
        } catch (e) {
          return `Unable to load command ${commandName}: ${e}`;
        }
    };
    
    
    
    client.pluginloader = (pluginname) => {
        try {
    
            const props = require(`../plugins/${pluginname}/index`)
            if (props.init) {
                props.init(client);
            }
    
    
            // set the plugin to the plugin enmap
            // -> TODO: plugin overview/ctl cmd
            client.plugins.set(pluginname, props.plugin)
    
            // now lets register the plugins commands.
            // TODO: make sure there's no double commands, aliases
    
            let plugincommands = props.plugin.cmds
            //console.log(plugincommands)
    
            for (let key in plugincommands) {
                if (plugincommands.hasOwnProperty(key)) {
                    value = plugincommands[key];
                    //console.log(key, value);
                    client.commands.set(key, value)
                    //console.log(client.commands)
                }
            }
    
    
    
    
    
    
        } catch (e) {
            return `Unable to load PLUGIN NAME`
        }
    }
    
    
    
    client.discordlog = () => {
    
    
        client.discordlog = (content, message, event) => {
            if (client.config.debug !== "true") return
              if (event) {
                return client.guilds.get(client.config.debugguild).channels.get(client.config.debugchannel).send(`__**Error:**__ ${event} \n${content} \n> __**Guild:**__ ${message.guild.name}(${message.guild.id}) \n> __**Channel**__ ${message.channel.id} \n> __**Message:**__ ${message.id} \n> __**Command**__ ${message.content} \n> __**Time:**__ ${dateFormat()}`)
              }
        
              return client.guilds.get(client.config.debugguild).channels.get(client.config.debugchannel).send(`__**Error:**__ ${content} \n> __**Guild:**__ ${message.guild.name}(${message.guild.id}) \n> __**Channel**__ ${message.channel.id} \n> __**Message:**__ ${message.id} \n> __**Command**__ ${message.content} \n> __**Time:**__ ${dateFormat()}`)
        
          }
    
    
    
    };
    
    
    
    
    client.permlevel = message => {
        let permlvl = 0;
    
        const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);
    
        while (permOrder.length) {
          const currentLevel = permOrder.shift();
          if (message.guild && currentLevel.guildOnly) continue;
          if (currentLevel.check(message)) {
            permlvl = currentLevel.level;
            break;
          }
        }
        return permlvl;
      };




      client.promptMessage = async (message, author, time, validReactions) => {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;
    
        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);
    
        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    
        // And ofcourse, await the reactions
        return message
          .awaitReactions(filter, {
            max: 1,
            time: time
          })
          .then(collected => collected.first() && collected.first().emoji.name);
      }



      client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
          const collected = await msg.channel.awaitMessages(filter, {
            max: 1,
            time: limit,
            errors: ["time"]
          });
          return collected.first().content;
        } catch (e) {
          return false;
        }
      };
    
    
    
};