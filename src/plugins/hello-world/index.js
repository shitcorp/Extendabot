const Discord = require('discord.js')
const dateFormat = require('dateformat');


exports.init = async (client) => {

console.log(`
+++++++++++++++++++++++++++++++++++++
+  >>>    Hello World v.1.0     <<<
+
+ Thanks for using my plugin or  idk 
+ what you would want to put im here
+ so im just writing some weird shit.
+++++++++++++++++++++++++++++++++++++
`)
return

};


async function hellocommand (message){

    message.channel.send("world.")

}


async function bye (message) {

    message.channel.send("cruel world, im leaving you today.")

}

async function foo(message) {

    let torun = require('./cmds/foo')
    torun.run(message);

}





exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "root"
};

exports.help = {
    name: "hello",
    category: "System",
    description: "Template command",
    usage: "hello"
};

/**
 * @desc each command name that is registered after cmds must export a function
 * so the command "hello" has to export a function called "exports.hello = () => {}"
 */

exports.plugin = {
    name: "Hello World Plugin",
    version: "1.0",
    cmds: {
        hello: {
            run: async (client, message, args, level) => {
                hellocommand(message);
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
        version: "1.0",  // BOT version
        perms: ['KICK_MEMBERS', 'BAN_MEMBERS'],  // perms the bot needs to execute this plugin
        repo: "http://github.com", // to display if error happens
        author: "MeerBiene#7060",
        authordiscordid: "686669011601326281"
    },
    help: {
        // This info will be displayed in the global help command
        name: "Pluginname",
        desc: "This is a very creative plugindescription, cause i want to see if the formatting worked properly.",
        category: "test"
    }
}