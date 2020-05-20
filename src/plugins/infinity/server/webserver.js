const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const chalk = require("chalk");
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

class webserver {
  constructor(port, client) {
    this.client = client;
    this.port = port;

    var accessLogStream = rfs.createStream('access.log', {
      interval: '1d', // rotate daily
      path: path.join(__dirname, 'log')
    })

    this.app = express();

    this.app.engine(
      "infinity",
      hbs({
        extname: "infinity",
        defaultLayout: "layout",
        layoutsDir: __dirname + "/layouts",
      })
    );

    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "infinity");
    this.app.use(express.static("public"));
    this.app.use(morgan('combined', { stream: accessLogStream }))
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
    this.app.unsubscribe(bodyParser.json());

    this.registerRoots();

    // todo: list all loaded routes in console log

    this.server = this.app.listen(this.port, () => {
      client.logger.log(
        `${chalk.bgMagenta(
          "[INFINITY]"
        )} Webserver running and listening on port: ${port}`
      );
    });
  }

  registerRoots() {
    // TODO: middleware for logging (conf option)
    // TODO: index router

    console.log(
      `${chalk.magenta(
        "\n# Infinity web server is starting and loading your config . . . \n# Registering: "
      )}`
    );

    const config = require("../config/ws_config");
    const routes = config.routes;

    for (let route in routes) {
      if (routes.hasOwnProperty(route)) {
        let prop = routes[route];

        if (route === "index" && prop.type === "STATIC") {
          console.log(
            `${chalk.magenta("# >>")} / ${chalk.magenta(
              `-> serving: "${prop.file}.html"`
            )} ${chalk.green.bold(`[INDEX ROUTE]`)} ${chalk.red.bgBlack.bold(`[STATIC]`)}`
          );

          this.app.get("/", (req, res) => {

            res.sendFile(__dirname + "/public/" + `${prop.file}.html`);
            
          });
        } else if (route === "index" && prop.type === "DYNAMIC") {

        } else {
          if (prop.type === "STATIC") {
            //do static routing here
            if (route === "index") return;
            console.log(
              `${chalk.magenta("# >>")} /${chalk.green(route)} ${chalk.magenta(
                `-> serving: "${prop.file}.html"`
              )}  ${chalk.red.bgBlack.bold(`[STATIC]`)}`
            );
            this.app.get(`/${route}`, (req, res) => {
              res.sendFile(__dirname + "/public/" + `${prop.file}.html`);
            });
          } else if (prop.type === "DYNAMIC") {
            // do dynamic rendering/hbs shit here
            if (route === "index") return;
            console.log(
              `${chalk.magenta("# >>")} /${chalk.green(route)} ${chalk.magenta(
                `-> serving: "${prop.file}.infinity"`
              )}  ${chalk.red.bgBlack.bold(`[DYNAMIC]`)}`
            );
            this.app.get(`/${route}`, (req, res) => {
              res.render(`${prop.file}`, prop.vars);
            });
          }
        }
      }
    }

    console.log(
      `${chalk.magenta(
        "# Thank you for using Infinity! You are awesome. \n"
      )}`
    );
  }
}

module.exports = webserver;