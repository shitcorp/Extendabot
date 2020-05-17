const chalk = require('chalk')
module.exports = (client) => {



    client.pluginloader = async (pluginname) => {
        client.logger.log(`Plugman [${chalk.yellow(`loading ...`)}] "${pluginname}"`)
        try {

            const props = require(`../plugins/${pluginname}/index`)
            const pkg = require("../../package.json") 
            
    
            if (props.plugin.conf.version < pkg.version) throw new Error(`Plugin was developed against an outdated version of this bot.`)
            
            
            if (props.init) {
                 props.init(client);
             }


            // -> TODO: plugin overview/ctl cmd
            client.plugins.set(pluginname, props.plugin)
            client.logger.log(`Plugman [${chalk.green(`loaded`)}] "${pluginname}"`)
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
            return client.logger.log(`Plugman [${chalk.red(`error`)}] Unable to load "${pluginname}" due to the following error: \n#####################\n${e}\n#####################`);
        }
    }





}