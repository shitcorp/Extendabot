const chalk = require('chalk')
module.exports = (client) => {



    client.pluginloader = async (pluginname) => {
        client.logger.log(`[${chalk.yellow(`loading ...`)}] "${pluginname}"`)
        try {

            const props = require(`../plugins/${pluginname}/index`)
            const pkg = require("../../package.json") 
            
    
            if (props.plugin.conf.version < pkg.version) throw new Error(`Plugin was developed against an outdated version of this bot.`)

            if (props.plugin.conf.type == "BASIC" && client.guilds.size > 1) throw new Error(`This plugin is made ot be only used in a single guild.`)
            
            
            if (props.init) {
                 props.init(client);
             }


            // -> TODO: plugin overview/ctl cmd
            client.plugins.set(pluginname, props.plugin)
            client.logger.log(`[${chalk.green(`loaded`)}] "${pluginname}"`)
            // now lets register the plugins commands.
            // TODO: make sure there's no double commands, aliases


            let plugincommands = props.plugin.cmds
            
            if (!plugincommands) return
            for (let cmd in plugincommands) {
                if (plugincommands.hasOwnProperty(cmd)) {
                    
                    value = plugincommands[cmd];
                    
                    client.commands.set(cmd, value)
                    
                }
            }
            
       
        } catch (e) {
            client.logger.log(`Plugman [${chalk.red(`error`)}] Unable to load "${pluginname}" due to the following error: \n#####################\n${e}\n#####################`);
            if (e.toString().includes(`Cannot find module`)) {
                client.logger.log(`Plugman [${chalk.red(`error`)}] You seem to miss a module. Install the missing module by running 'npm install "modulename"'`)
            }
        }
    }





}