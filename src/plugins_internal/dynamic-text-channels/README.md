# Dynamic Text Channels v1.0

### This plugin allows you to have dynmic text channels, that are linked to certain voice channels. To set the plugin up, simple create the textchannels you want your users to see when they join vertain voicechannels. 

### Then, enable discord developer mode if not already activated and copy the ID's of the voichechannel and textchannels, then place the copied IDs inside your channels.json. Edit it with something like Notepad++ or Visual Studio Code, to ensure your json is formatted properly. Otherwise you can also use online [JSON Validator](https://jsonformatter.curiousconcept.com/).

# channels.json:

### The channels.json works like the following; As soon as a new user joins a voicechannel, the bot will look thru this file to see if there are any textchannels connected to that Voice channel. When there is one, the user will get access to that linked text channel.
```js
{
    // Voicechannel ID  :   Textchannel ID
    "712215861645279262": "712215893530378331"
    // make sure to change these values
}
```

