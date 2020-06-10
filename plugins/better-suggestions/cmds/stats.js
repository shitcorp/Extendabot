const config = require('../config.json')



exports.run = (client, message, args, level) => {

    

       const channel = message.guild.channels.cache.get(config["approved-channel"])
       const ID = "582849062399901696";
       
       channel.messages
         .fetch({ limit: 10 })
         .then((messages) => {
             console.log(`Received ${messages.size} messages`)
             
            let output = 0;
            for (const message of messages) {
                for (const props of message) {
                    if (typeof props.embeds === "object") {
                        for (const embed of props.embeds) {
                            if (embed.footer !== null && embed.footer.text.includes(ID)) {
                                
                                embed.fields.forEach(field => {
                                    if (field.name == "__**Votes:**__") {
                                        //console.log(field)
                                        
                                        
                                        let final = field.value.split("**")
                                        //   .replace(/"**"/g, "")
                                        //   .replace("👍", "")
                                        //   .replace("👎", "");
                                          
                                        final.forEach(element => {

                                            
                                            
                                            if (
                                              element != "**" &&
                                              element != "👍" &&
                                              element != "  👎"
                                            ) {
                                              console.log(element);
                                            }
                                        })
                                    }
                                })
                                
                                output++
                            }
                        }
                    }
                    
                }
                
            }

            console.log(output)

            message.channel.send(`You have ${output} approved suggestions in total.`)

            })
         .catch(console.error);




}