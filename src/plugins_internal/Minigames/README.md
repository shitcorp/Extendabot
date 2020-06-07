# Minigames Plugin

Fun little minigames for your server

## Commands:

> + **achievement**
>   + returns a nice little achievement unlocked embed.
>
> + **love [@UserMention]**
>   + tells you how much that person loves you.
>
> + **meme**
>   + returns a random meme from a random subreddit. You can specify the subreddits you want to use in the config.
>
> + **rps**
>   + play a game of Rock Paper Scissors against the bot.

## Config:

The config lives in the `/config` directory and can be edited very easily. Make sure to edit it with Notepad++ or Visual Studio Code or something similar, to ensure your config.json is formatted properly. Otherwise you can always use an online Validator like [this](https://jsonformatter.curiousconcept.com/).

```js

{
  "embedcolor": "BLUE",  //embed color that will be used for all embeds from this plugin

  "dice": true,  // enable/disable dice command
  "rps": true,  // enable/disable rps command
  "love": true,  // enable/disable love command
  "achievement": true,  // enable/disable achievement command
  "meme": {  
    "enabled": true,  // enable/disable meme command
    "subreddits": ["dankmeme", "meme", "me_irl", "MemeEconomy", "ComedyCemetery", "dankmemes", "funny"]  // specify the subreddits you want to pull your memes from
  }  // make sure they exist tho!
}

```
