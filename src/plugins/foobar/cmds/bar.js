exports.run = async (client, message, args, level) => {
   
    message.channel.send(`Bar.`)    

    client.on('message', msg => {


        console.log(msg)

    })

}