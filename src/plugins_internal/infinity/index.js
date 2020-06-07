exports.init = (client) => {

    
    
    let ws = require('./server/webserver')
    let Ws = new ws(3000, client)

    //client.server = require('./data/routes')(client)

    //console.log(client)
    

}


exports.plugin = {
    name: "Infinity",
    version: "1.0",
    desc: "Just a simple webserver, that allows you to serve static html pages.",
    conf: {
        version: "1.0",
        perms: [],
        author: "MeerBiene#7060",
        authordiscordid: "",
        type: "BASIC"
    },
    help: {
        name: "Infinity Web Server",
        desc: "just a simple web server",
        category: "Utility"
    }
    

}