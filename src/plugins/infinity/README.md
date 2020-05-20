# **Infinity Web Server**

### Serve static HTML pages directly from your Discord. But it gets better. I offer you some variables that you can place inside your HTML, that look like this: {{guildname}} or {{guildowner}}

# Important: 

#### This was mainly made for dynamic pages that allow you to render in dynamic values. I mean you can also use it as a static file server, thats up to you. 
> BUT: no matter what, use a reverse proxy like Apache or what i recommend NGNINX to proxy your traffic from port 443 (SSL) to the port you want your webserver to be running on!


# Config:

## Dynamic routes:
### **Note:** The files you want to serve dynamically, have to be located in the `/views` directory and end with .infinity

### **Recommendation:** I strongly recommend to make a plain HTML File, write everything in there that you have to write (you can place your variables while writing the HTML) and then renamin the file.

```js

{
    "port": 3000,  // port your want your webserver to listen on
    "routes": {
        "test": {  // route, this will be what has to be behind the /, so "test" resembles the route: "localhost:3000/test"
            "type": "DYNAMIC", // Dynamic or static, static are basic HTML files, dynamic are hbs files that offer you the ability to use variables in your HTML file.
            "file": "testfile", // filename without extension. For dynamic pages you have to use the /views directory, for static pages, the /public directory
            "vars": {
                "title": "Hello World",
                "something": "Something",
                "else": "else"
            }
        }
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

## Static routes:
### **Note:** The files you want to serve static, have to be located in the `/public` directory and end with .html

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


# Planned features:

> + Adding in a Mardown to HTML Converter with [showdown](https://github.com/showdownjs/showdown)
> + Adding Logger Middleware to log requests into a .log file
> + Adding Analytics so you can see what routes get/got the most traffic.