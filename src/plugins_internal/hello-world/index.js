const Discord = require('discord.js')
const dateFormat = require('dateformat');

exports.init = async (client) => {

console.log(`+++++++++++++++++++++++++++++++++++++
+  >>>    Hello World v.1.0     <<<
+
+ Thanks for using my plugin or  idk 
+ what you would want to put im here
+ so im just writing some weird shit.
+++++++++++++++++++++++++++++++++++++`)

require('./data/func')(client);


};


async function hellocommand (client, message){

    client.helloworldgreeter(message)

}


async function bye (message) {

    let cmd = require('./cmds/bye')
    cmd.run(message)

}



exports.plugin = {
    name: "Hello World Plugin",
    version: "1.0",
    cmds: {
        hello: {
            run: async (client, message, args, level) => {
                hellocommand(client, message);
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['hallo'],
                permLevel: "STAFF"
            },
            help: {
                name: "hello",
                category: "Mod",
                description: "Hello world command.",
                usage: "hello -> returns world"
            }
        },
        bye: {
            run: async (client, message, args, level) => {
                bye(message);
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: ['goodbye'],
                permLevel: "STAFF"
            },
            help: {
                name: "bye",
                category: "Mod",
                description: "This is a creative text, dont mind me",
                usage: "bye -> tells the world goodbye from you."
            }
        }
    },
    conf: {
        version: "1.0.0",  // BOT version
        perms: ['KICK_MEMBERS', 'BAN_MEMBERS'],  // perms the bot needs to execute this plugin
        repo: "http://github.com", // to display if error happens
        author: "MeerBiene#7060",
        authordiscordid: "686669011601326281"
    },
    help: {
        // This info will be displayed in the global pluginmanager command
        name: "Pluginname",
        desc: "This is a very creative plugindescription, cause i want to see if the formatting worked properly.",
        category: "test"
    }
}