# UserGreeter for ExtendABot!
## config
> NEEDS DISCORD DEVELOPER MODE ENABLED! ( IF YOU DONT KNOW HOW TO ENABLE: [CLICK HERE](https://discordia.me/developer-mode) )
```json
{
    "greetingmessage": {
        "message": "Welcome %USER% to %SERVERNAME%!", // Will be ignored if embed is true
        "embed": false, // Do you want to send the message as an embed?
        "embedProp": {
            "message": "", // If you want to send a message with your embed, leave empty to send no message
            "title": "Welcome!", // Embed title
            "description": "%USER% to %SERVERNAME%", // Embed description, placeholders: %USER% = joined user | %SERVERNAME% = Name of your server
            "thumbnail": "", // EmbedThumbnail, leave empty to ignore
            "author": { // Author, iamge and name have to be filled, otherwise this option will be ignored.
                "image": "",
                "name": ""
            },
            "footer": { // EmbedFooter
                "message": "", // Footer message
                "timestamp": false
            },
            "image": "", // Embed image, leave empty for no image
            "color": "FFFFFF", // The color of the embed, leave empty if you want no color
            "fields": { // Add as many embed fields in as you want
                "key": "value",
                "key2": "value2"
            }
        }
    },
    "dm": true, // Should this message be sent in dms?
    "channel": "ID_HERE" // Will be ignored if dm is true (Should be a channelId!)

}
```