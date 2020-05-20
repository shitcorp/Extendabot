const config = require('./data/config.json')

exports.init = (client) => {

    let ws = require('./server/ws')
    let Ws = new ws(config.port, client)

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