# Infinity

### Serve static HTML pages directly from your Discord. But it gets better. I offer you some variables that you can place inside your HTML, that look like this: {{guildname}} or {{guildowner}}


## Config:

```js

{
    "port": 3000,  // port your want your webserver to listen on
    "routes": {
        "test": {  // route, this will be what has to be behind the /, so "test" resembles the route: "localhost:3000/test"
            "type": "DYNAMIC", // Dynamic or static, static are basic HTML files, dynamic are hbs files that offer you the ability to use variables in your HTML file.
            "name": "test",  // this has to be the same name as the route
            "file": "testfile", // filename without extension. For dynamic pages you have to use the /views directory, for static pages, the /public directory
            "title": "This is a testroute" // This is the title that willl be replacedin the header if your page is dynamic
        },
        // another route but static, this will server the bar.html file in the /public directory
        "foobar": {
            "type": "STATIC",
            "name": "foo",
            "file": "bar",
            "title": "This is another route, but static"
        }
    }
}

```