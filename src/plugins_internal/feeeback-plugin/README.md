# Simple Feedback Plugin

Yeah the name gives it I guess. Simple Feedback Plugin. Registers a "feedback" command for your members to give feedback at any time

# Cmds:
> `feedback`

# Config:

The config is located inthe /data directory. Change the messages that are sent to the user in here. I recommend you to just place in a channel ID for the feedback and testing the plugin first, so you see, which message correlates to what user prompt.

### Note:

> Edit the config.json with something like Notepad++ or Visual Studio Code, to ensure your json is formatted properly. Otherwise you can also use online [JSON Validator](https://jsonformatter.curiousconcept.com/).
```js

{
    "welcomefeedback": "true",
    "feedbackemoji": "Click one of the reactions below to rate your overal experience on the server.",
    "feedbackquestion": "Now briefly describe what you want to tell the staff team of this server.",
    "feedbackmessageconfirm": "Okay this is your feedback message are you happy with it? If you want to change something, click the ❌ reaction.",
    "feedbacksentsuccessmsg": "Your feedback message has been registered. Thank you for contributing to the project.",

    "feedbackchannel": "710022037321678959" // Feedback channel (ID!!)
}

```