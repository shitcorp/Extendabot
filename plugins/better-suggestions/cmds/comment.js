const { text } = require("body-parser");

exports.run = async (client, message, args, level) => {

    const { dbupdate, dbfindbyid, dbpull } = require("../util/db");
    const config = require('../config.json')
    const uniqid = require('uniqid');
    const systime = Date.now()


   

    if (!message.flags[0]) return message.channel.send(client.error(`Please specify a suggestion to comment. Get the ID from the Footer of your suggestion message.`))
    
        if (message.flags[0] && !message.flags[1]) {
            try {
                dbfindbyid(message.flags[0]).then((res) => {
                    if (!res[0]) return message.channel.send(client.error(`This suggestion does not seem to exist.`))
                    //if (res[0].expires !== "expired") return message.channel.send(client.error(`This suggestion is still active, so you cant comment it right now.`))
                    var text = args.join(' ')
                    console.log(systime)
                    const comm = {
                        id: uniqid(),
                        author: message.author.id,
                        content: text,
                        systime,
                        edited: false,
                        lastedit: "null",
                        display: true
                    }
                    dbupdate(res[0].id, { $push: { 'comments': comm } })

                    dbfindbyid(message.flags[0]).then(doc => {
                        if (!doc[0]) return;
                        message.channel.send(client.commentedembed(message, client.users.cache.get(res[0].author), res[0].suggestion, "won", 2, 2, doc[0].comments, message.flags[0]))
                    })

                });
            } catch (e) {
                console.error(e)
            }

        } else if (message.flags[0] && message.flags[1] == "edit") {



        async function editcomment() {
            if (!args) return message.channel.send(client.error(`You forgot to give a new text for your comment`))
            dbfindbyid(message.flags[0]).then(async (res) => {
                if (!res[0]) return message.channel.send(client.error(`This suggestion does not exist`))
                const toloop = res[0].comments
                for (const props of toloop) {
                
                    if (typeof props.author != "undefined") {
                        if (props.author !== message.author.id) return message.channel.send(client.error(`You never commented on that suggestion.`))
                        console.log(typeof props)
                        console.log(props.author)
                        let newtext = args.join(' ')
                        const newcomm = {
                            id: props.id,
                            author: props.author,
                            content: newtext,
                            systime: props.systime,
                            edited: true,
                            lastedit: systime,
                            display: true
                        }
                        await dbpull(client, res[0]._id, props.id)
                        dbupdate(res[0].id, { $push: { 'comments': newcomm } })
                        dbfindbyid(res[0]._id).then(async resp => {
                            message.channel.send(client.commentedembed(message, client.users.cache.get(res[0].author), res[0].suggestion, "won", 2, 2, resp[0].comments, message.flags[0] ))     
                        })
                        

                    } else {
                        return message.channel.send(client.error(`You never commented on that suggestion.`))
                    }
                }
            })
        }


        editcomment()
       
    } else if (message.flags[0] && message.flags[1] === "delete") {
        // TODO: delete comment command (move it from comment arrray to deleted comments)

        if (!message.flags[0]) return message.channel.send(client.error(`Please specify a suggestion you want to delete your comment from. Get the ID from the Footer of your suggestion message.`))
    
      
                dbfindbyid(message.flags[0]).then(async res => {
                    console.log(res)
                    if (!res[0]) return message.channel.send(client.error(`This suggestion does not seem to exist.`))
                    if (!res[0].comments) return message.channel.send(client.error(`There are no comments on this suggestion.`))
                    if (!res[0].comments[0]) return message.channel.send(client.error(`There are no comments on this suggestion.`))
                    let comarr = res[0].comments
                    comarr.forEach(async comment => {
                        console.log(typeof comment);
                        console.log(comment);
                        if (comment.author !== message.author.id) return message.channel.send(client.error(`You never commented on this suggestion.`))
                        await dbpull(client, res[0]._id, comment.id)
                        dbupdate(res[0]._id, { $push: { 'deletedcomments': comment } })
                        dbfindbyid(res[0]._id).then(async resp => {
                            client.editapprovedsuggestion(message, client.users.cache.get(res[0].author), res[0].suggestion, "won", res[0].upvotes, res[0].downvotes, resp[0].comments, message.flags[0], res[0].msgid)
                        });
                        message.channel.send(client.success(`Successfully deleted your comment: \`\`\`${comment.content}\`\`\``));
                    });
                });


    } else if (message.flags.includes("sudo") && message.flags[0] && message.flags[1] === "delete") {
        console.log("sudo mode has been entered")
        // TODO: permcheck here
    }

    
}