const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {

    let config = require('../data/config.json')




    async function feedbacker(msg, rate) {
        msg.clearReactions().catch(error => {});

        msg.edit(client.embed(`${config.feedbackquestion}`)).then(msg => {
            let response = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
                time: 60000
            });

            response.on('collect', res => {
                //msg.delete().catch(error => {})
                res.delete().catch(error => {})

                msg.edit(client.embed(`${config.feedbackmessageconfirm} \n` + "```" + res +"```")).then(async m => {
                    
                    let emoji = await client.promptMessage(m, message.author, 90, ['✅', '❌'])

                    if (emoji === '✅') {
                        
                        m.delete().catch(error => {})
                        m.channel.send(client.success(`${config.feedbacksentsuccessmsg}`)).then(msg => { msg.delete(30000).catch(error => {}) })
                        // TODO send embed to feedbackmsg

                        let embed = new Discord.RichEmbed()
                        .setTitle(`${rate} Feedback`)
                        .setDescription(`by <@${message.author.id}>`)
                        .addField(`__**Feedback Message:**__`, "> `" + `${res}` + "`")
                        .setTimestamp()

                        if (rate === "Positive") {
                            embed.setColor("GREEN")
                        } else if (rate === "Negative") {
                            embed.setColor("RED")
                        }

                        message.guild.channels.get(config.feedbackchannel).send(embed).then(msg => {
                            if (rate === "Positive") {
                                msg.react("👍")
                            } else if (rate === "Negative") {
                                msg.react("👎")
                            }
                        })
                    
                    } else if (emoji === '❌') {

                        feedbacker(msg);

                    }

                })

            })
        })
    }







    message.delete().catch(error => {});

    message.channel.send(client.embed(`${config.feedbackemoji}`)).then(async msg => {

    let emoji = await client.promptMessage(msg, message.author, 90, ['👍', '👎'])

    if (emoji === "👎") {

        feedbacker(msg, "Negative");

    } else if (emoji === "👍") {

        feedbacker(msg, "Positive")

    }

    })
    
    
    
    
   





}