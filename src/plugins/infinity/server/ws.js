const config = require('../data/config.json')
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('chalk');


class webserver {


    constructor(port, client) {

        this.client = client;
        this.port = port;


        this.app = express()

        this.app.engine('hbs', hbs ({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: __dirname + '/layouts'
        }))

        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'hbs')
        this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({
            extended: false
        }))
        this.app.unsubscribe(bodyParser.json())

        this.registerRoots()

        // todo: list all loaded routes in console log

        this.server = this.app.listen(port, () => {
            client.logger.log(`${chalk.bgMagenta('[INFINITY]')} Webserver running and listening on port: ${port}`)
        })


}


    
    registerRoots() {
    
        // TODO: middleware for logging (conf option)
        // TODO: index router


        console.log(`${chalk.magenta('################################################################\nInfinity web server is starting and loading your config . . . \nRegistered Routes:\n')}`);



        const routes = config.routes

        for (let route in routes) {
            if (route === "index") return
            if (routes.hasOwnProperty(route)) {
                let prop = routes[route]
                if (prop.type === "STATIC") {
                    //do static routing here

                    console.log(`${chalk.magenta('>>')} /${chalk.green(route)} ${chalk.magenta(`-> file: "${prop.file}.html"`)}  ${chalk.red.bgBlack.bold(`[STATIC]`)}` )
                    this.app.get(`/${route}`, (req, res) => {
                        this.client.logger.log(`${chalk.bgMagenta('[INFINITY]')} The route '/${route}' has been requested by '${req.ip}'`)
                        res.sendFile(__dirname + '/public/' + `${prop.file}.html`);
                    });

                } else if (prop.type === "DYNAMIC") {
                    // do dynamic rendering/hbs shit here

                    console.log(`${chalk.magenta('>>')} /${chalk.green(route)} ${chalk.magenta(`-> file: "${prop.file}.hbs"`)}  ${chalk.red.bgBlack.bold(`[DYNAMIC]`)}` )
                    this.app.get(`/${route}`, (req, res) => {
                        res.render(`${prop.file}`, prop.vars )
                    })

                }
            }
        } 

        console.log(`${chalk.magenta('\n################################################################')}`)

    }



    
}


module.exports = webserver