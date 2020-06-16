exports.run = (client, message, args, level) => {

    const systime = new Date();
    const { listTimeZones } = require('timezone-support')
    const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone')

    //const timeZones = listTimeZones()

    //time
    // To fukcing find our how to change the converted FROM timeone
    //console.log(utcDate)
    //const utcDate = format(systime, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'America/New_York' })

    // Asia/Bangkok
    const date = parseFromTimeZone(systime, { timeZone: args[0] })
    const test = formatToTimeZone(systime, 'D.M.YYYY HH:mm:ss. z [UTC]Z', { timeZone: args[0] })

    
    console.log(date)

    //message.channel.send(client.embed(utcDate));
    message.channel.send(client.embed(date));
    message.channel.send(client.embed(test));


}