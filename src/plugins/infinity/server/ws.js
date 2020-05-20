
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');


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
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use(bodyParser.urlencoded({
            extended: false
        }))
        this.app.unsubscribe(bodyParser.json())


        this.server = this.app.listen(port, () => {
            client.logger.log(`Your infinity web server is started and listening on port: ${port}`)
        })

    }

}


module.exports = webserver