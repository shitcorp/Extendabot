# Simple Suggestions

A really simple suggestions plugin. Lets your members use the `suggest` command.

The suggestion will then be posted in the suggestions channel and the bot reacts with an up- and downvote symbol. 

The suggestions channel can be configured in the `config.json` which is located in the `/config` directory.


## Config: 

```js
    {
        "suggestionchannel": "CHANNEL_ID_HERE",  // here you put the ID of the channel where you want your suggestions to be posted in.
        "reactions": "ARROWS"  // options: "ARROWS" or "THUMBS"
    }
```




## Roadmap:

> + Optional voting engine => 
    + means: user suggest something ->  
    + suggestion gets posted in a "suggestions awaiting approval" channel ->
    + other users have to vote for the suggestion -> 
    + if there have been enough upvotes in time, the suggestion will be sent into a "approved" suggestions channel