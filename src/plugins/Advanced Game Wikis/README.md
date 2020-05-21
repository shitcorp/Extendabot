# Advanced Game Wikis

This plugin is made for game server owners. It allows you to register wiki pages with the according links.

## Usage:

Edit the ``config.json`` that is located in the `/config` directory. Make sure to edit it with something like Notepad ++
or Visual Studio Code to ensure your JSON is valid. If you dont want to use any
of those, you can simply use an online JSON validator.


### Config:

```js
{
  "embedcolor": "BLUE", // this supports HEX colors as well as "BLUE" "RED" "GREEN" "YELLOW"

  "pages": {
    "testpage": {  // this is the page title. To get the link to testpage the command would be "wiki testpage"
      "link": "https://google.com/",  // needed, if this is not set the plugin wont work
      "image": "https://boomer.pw/i/6WiH8lu3.png"  // optional: you can save a link to an image and use it as Image or thumbnail
    },
    "anotherpage": {
      "link": "https://google.com/",  // again, if you dont set this, the plugin won't work
      "thumbnail": "https://boomer.pw/i/BsmF6zjJ.png"  // SAme function as mentioned above, just that its a thumbnail this time.
    }
  }
}
```