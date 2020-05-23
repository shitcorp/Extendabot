exports.init = (client) => {

require('./data/func')(client);

console.log(`
#######                                                                                   
#       ###### ###### #####  #####    ##    ####  #    #   
#       #      #      #    # #    #  #  #  #    # #   #      
#####   #####  #####  #    # #####  #    # #      ####      
#       #      #      #    # #    # ###### #      #  #    
#       #      #      #    # #    # #    # #    # #   #    
#       ###### ###### #####  #####  #    #  ####  #    #   

>>  Feedback Plugin v1.0 . . . is loaded ready to go.
>>  Thanks to "TheBurger3#3541" for the idea.
`)

}


exports.plugin = {
    name: "Feedback_Plugin",
    version: "1.0",
    cmds: {
        feedback: {
            run: async (client, message, args, level) => {
                let cmd = require('./cmds/feedback')
                try {
                    cmd.run(client, message, args, level)
                } catch (e) {
                    console.log("error trying to execute feedback command")
                }
            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
            },
            help: {
                name: "feedback",
                category: "Utility",
                description: "Gives you the oppotunity to submit some feedback.",
                usage: "feedback -> The bot will ask you some questions that you have to answer in order to submit feedback."
            }
        }
    },
    conf: {
        version: "1.0",  // BOT version
        perms: ['SEND_MESSAGES', 'MANAGE_MESSAGES', 'READ_MESSAGES'],  // perms the bot needs to execute this plugin
        repo: "http://github.com/MeerBiene/ExtendaBot", // to display if error happens
        author: "MeerBiene#7060",
        authordiscordid: "686669011601326281",
        type: "BASIC"
    },
    help: {
        // This info will be displayed in the global help command
        name: "Feedback Plugin",
        desc: "This plugin allows your users/members to easily sumbit feedback. The message displayed to the user upon running the feedback command can easily be changed in the config.",
        category: "Utility"
    }
}