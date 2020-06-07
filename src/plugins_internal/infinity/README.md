# **Infinity Web Server**



### Serve static HTML pages directly from your Discord. But it gets better. I offer you some variables that you can place inside your HTML, that look like this: {{guildname}} or {{guildowner}}

# Important: 

#### This was mainly made for dynamic pages that allow you to render in dynamic values. I mean you can also use it as a static file server, thats kinda missing the point. 
> BUT: no matter what, please for the love of god, use a reverse proxy like Apache or NGINX (recommended!) to proxy your traffic from port 443 (SSL) to the port you want your webserver to be running on!


# Config:

> ### Every route that you want your webserver to serve, has to be configured in the ws_config.json. It's located in the /config directory. Edit it with something like Notepad++ or Visual Studio Code, to ensure your json is formatted properly. Otherwise you can also use online [JSON Validator](https://jsonformatter.curiousconcept.com/).


> ## What are Routes you may ask? 
> ### Its simply the stuff that comes after your Domain. So if we look at the URL example.com/foo, "/foo" would be the route in that case. If you would want to register a route to lets say example.com/foo/bar, simply register "/foo/bar" as route.

## Dynamic routes:
### **Note:** The files you want to serve dynamically, have to be located in the `/server/views` directory and end with .infinity

### **Recommendation:** I strongly recommend to make a plain HTML File, write everything in there(you can place your variables while writing the HTML) and then chaning the file extension to .infinity

```js

{
    "port": 3000,  // port your want your webserver to listen on
    "routes": {
        "test": {  // route, this will be what has to be behind the /, so "test" resembles the route: "localhost:3000/test"
            "type": "DYNAMIC", // Dynamic or static, static are basic HTML files, dynamic are .infinity files that offer you the ability to use variables in your HTML file.
            "file": "testfile", // filename without extension. For dynamic pages you have to use the /views directory, for static pages, the /public directory
            "vars": {
                "title": "Hello World",
                "something": "Something",
                "else": "else"
            }
        }
       
    }
}

```

## Static routes:
### **Note:** The files you want to serve static, have to be located in the `/server/public` directory and end with .html

```js

{
    "port": 3000,  // port your want your webserver to listen on
    "routes": {
        "foobar": {
            "type": "STATIC",
            "file": "bar"  // <- This has to be a .html file
        }
    }
}

```

## Index Router:
### Index means the first route after the /. To register an index route you simple name the route "index". Its as easy as that.

```js

{
    "port": 3000,  // port your want your webserver to listen on
    "routes": {
        "index": {
            "type": "STATIC",
            "file": "index"  // has to be an .html file!
        },
        "someotherroute": {
            "type": "STATIC",
            "file": "someotherroute" // filename without extension 
        }
    }
}

```

# Changelog:

> + Added Request Logging Middleware [morgan](https://github.com/expressjs/morgan)


# Planned features:

> + Adding in a Mardown to HTML Converter with [showdown](https://github.com/showdownjs/showdown)
> + Adding Analytics so you can see what routes get/got the most traffic.