exports.run = (client, message, args, level) => {

    const systime = new Date();
    const { listTimeZones } = require('timezone-support')
    const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone')

    

    //const timeZones = listTimeZones()

    // does this change anything
    //time
    // To fukcing find our how to change the converted FROM timeone
    // lets
    // bot
    // some
    // contributions
    
    //console.log(utcDate)
    //const utcDate = format(systime, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'America/New_York' })

    //>>time <hour> <ogzone> <convertzone>
    if(!args[0]) return message.channel.send(client.error("You did not provide a valid hour!"))
    console.log(isNaN(args[0]));
    console.log(parseInt(args[0]))
    console.log(typeof parseInt(args[0]))
    if (parseInt(args[0]) == 'NaN') return message.channel.send(client.error(`${args[0]} is not a valid number!`))
    //console.log(listTimeZones())

    // Asia/Bangkok
    const date = parseFromTimeZone(systime, { timeZone: args[0] })
    const test = formatToTimeZone(systime, 'D.M.YYYY HH:mm:ss. z [UTC]Z', { timeZone: args[0] })

    // >>command -flag[0] args[0]

    console.log(date)

    //message.channel.send(client.embed(utcDate));
    message.channel.send(client.embed(date));
    message.channel.send(client.embed(test));

function isInt(number){
    try{
        parseInt(number)
        return true
    }catch(e){
        return false
    }
}
}