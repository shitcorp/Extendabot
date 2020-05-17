exports.init = (client) => {


console.log(`
+++++++++++++++++++++++++++++++++++++
>>>>>>>    Foo Bar v.2.0.1  <<<<<<<<
+++++++++++++++++++++++++++++++++++++
`)
return


}



exports.plugin = {
    name: "foo-bar",
    desc: "returns bar",
    version: "2.0",
    cmds: {
        foo: {
            run: async (client, message, args, level) => {
                
                let torun = require('./cmds/bar')
                torun.run(client, message, args, level)

            },
            conf: {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "STAFF"
            },
            help: {
                name: "foo",
                category: "foobar",
                description: "returns bar when you do foo",
                usage: "foo"
            }
        }
    },
    conf: {
        version: "1.0",
        perms: ['ADMINISTRATOR'],
        repo: "",
        author: "Test#0420",
        authordiscordid: "686659882551607346"
    },
    help: {
        name: "NAME",
        desc: "kein plan diggi",
        category: "MOD"
    }
}