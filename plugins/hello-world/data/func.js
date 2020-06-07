module.exports = (client) => {



    client.helloworldgreeter = async (message) => {
        message.channel.send(client.embed(`World.`))
    }



}