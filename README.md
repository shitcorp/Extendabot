# ExtendABot - The modular discord bot!
## Concept of plugins
ExtendABot is a completely modular discord bot with a pluginmanager. With that pluginmanager you can enable or disable plugins for your server. ExtendABot has a very extensive API for plugin-creaters.

## Create a plugin
Creating a plugin is super easy. All you need to do is to create a folder for your plugin in the `plugins`folder, and create an `index.js` file. That index file is your main/init file that the pluginmanager will read.
Example:
> Index.js
```js
exports.plugin = {
    name: "MyPlugin",
    version: "1.0",
    conf: {
        version: "1.0",  // BOT version
        perms: ['READ_MESSAGES', 'SEND_MESSAGES'],  // perms the bot needs to execute this plugin
        repo: "http://github.com", // to display if error happens
        author: "MyName#1234",
        authordiscordid: "MYID"
    },
    help: {
        // This info will be displayed in the global pluginmanager command
        name: "MyPlugin",
        desc: "This is my own plugin!",
        category: "Utility"
    }
}
```
You can also add commands with only adding a simple section to your index:
```js
exports.plugin = {
    name: "MyPlugin",
    version: "1.0",
    cmds: {
        example: {
            run: async (client, message, args, level) => {
                let cmd = require('./cmds/mycommand')
                cmd.run(client, message, args, level)
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "example",
                category: "Utility",
                description: "Example command",
                usage: "example"
            }
        }
    },
    conf: {
        version: "1.0",  // BOT version
        perms: ['READ_MESSAGES', 'SEND_MESSAGES'],  // perms the bot needs to execute this plugin
        repo: "http://github.com", // to display if error happens
        author: "MyName#1234",
        authordiscordid: "MYID"
    },
    help: {
        // This info will be displayed in the global pluginmanager command
        name: "MyPlugin",
        desc: "This is my own plugin!",
        category: "Utility"
    }
}
```
ExtendABot also supports Events:
```js
exports.plugin = {
    name: "MyPlugin",
    version: "1.0",
    cmds: {
        example: {
            run: async (client, message, args, level) => {
                let cmd = require('./cmds/mycommand')
                cmd.run(client, message, args, level)
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "example",
                category: "Utility",
                description: "Example command",
                usage: "example"
            }
        }
    },
    events: {
        guildMemberAdd: {
            run: async (client, member) => {
                member.send("Welcome!").catch(error => {});
            }
        }
    },
    conf: {
        version: "1.0",  // BOT version
        perms: ['READ_MESSAGES', 'SEND_MESSAGES'],  // perms the bot needs to execute this plugin
        repo: "http://github.com", // to display if error happens
        author: "MyName#1234",
        authordiscordid: "MYID"
    },
    help: {
        // This info will be displayed in the global pluginmanager command
        name: "MyPlugin",
        desc: "This is my own plugin!",
        category: "Utility"
    }
}
```
**Voila!** We now have made our very own ExtendABot plugin! You can play around with the API as much as you want since it's very customizable and modular.