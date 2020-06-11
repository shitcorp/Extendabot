module.exports = async (client) => {
    
  
    // Make the bot "play the game" which is the help command with default prefix.
    client.user.setActivity("Yandere Simulator");

    client.eventmanager("ready", client)

    // client.guilds.cache
    //   .get("589958750866112512")
    //   .channels.cache.get("589961271122853898")
    //   .send("Edvio gay.");
    /*
    !Here we check if the database exists, if not were creating it.
    !This is important cause it will create this database if the bot
    !crashed or something else happened
    */
   
    /*
    let servers = client.guilds
    servers.forEach(server => {
    //this method is defined in functions.js, 
    //it will check if the defualt settings db exists
    //and if not it will be created, it will also
    //make sure to instert the default settings
    //params - (tablename, server(in this case the guild object))
    client.createsettingsdbifnotexists("guilddata", server)
    });
    */
  
    
   //client.dbcreateconfig();
    client.plugins.forEach(plugin => {
     if (plugin.conf.type) {            
         if (plugin.conf.type === "BASIC" && client.guilds.size > 1) {
           client.logger.warn(`The plugin "${plugin.name}" is marked as BASIC, which means it only functions properly when the bot is in a single guild only. Expect your bot to malfunction.`)
         }
     }
    })

    client.logger.ready(`${client.user.username} is ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`)

};