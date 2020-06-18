const { text } = require("body-parser");

exports.run = async (client, message, args, level) => {

    const { dbupdate, dbfindbyid, dbpull, configget } = require("../util/db");
    const configraw = await configget(message.guild.id)
    const config = configraw[0];
    
    const uniqid = require('uniqid');
    const systime = Date.now()
    const apprchannel = message.guild.channels.cache.get(config.approved_channel);

    if (message.persists[0]) {
        sudofunc();
    } else if (!message.flags[0]) {
         return message.channel.send(client.error(`Please specify a suggestion to comment. Get the ID from the Footer of your suggestion message.`))
    } else if (message.flags[0] && !message.flags[1]) {
        try {
            dbfindbyid(message.flags[0]).then((res) => {
                if (!res[0]) return message.channel.send(client.error(`This suggestion does not seem to exist.`))
                if (res[0].expires !== "expired") return message.channel.send(client.error(`This suggestion is still active, so you cannot comment on it right now.`))
                var text = args.join(' ')
                let i=0;
                let len=0;
                if (res[0].comments) {
                    res[0].comments.forEach(comm => {
                        len++
                        if (comm.author === message.author.id) {
                            i++
                        }
                    })
                }
                
                if (i >= 1) return message.channel.send(client.error(`You already commented on that suggestion. If you want to edit your comment, use this command with the \`-edit\` flag.`))
                if (len > 20) return message.channel.send(client.error(`This suggestion has already reached it's maximum comment count. You can no longer comment on it.`))
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

                    let ident = "lost";
                    if (doc[0].approved) {
                        ident = "won";
                    }

                    apprchannel.messages.fetch(doc[0].apprmsgid).then(msg => {
                        msg.edit(client.commentedembed(message, client.users.cache.get(res[0].author), res[0].suggestion, ident, doc[0].upvotes, doc[0].downvotes, doc[0].comments, message.flags[0]))
                    })
                })

            });
        } catch (e) {
            console.error(e)
        }

    } else if (message.flags[0] && message.flags[1] == "edit") {



        async function editcomment() {
            let k = 0;
            if (!args) return message.channel.send(client.error(`You forgot to give a new text for your comment`))
            dbfindbyid(message.flags[0]).then(async (res) => {
                if (!res[0]) return message.channel.send(client.error(`This suggestion does not exist`))
                const toloop = res[0].comments
                for (const props of toloop) {
                    
                    if (typeof props.author != "undefined") {
                        if (props.author === message.author.id) {
                            k++
                        }
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
                    
                        
                        if (k !== 0) return message.channel.send(client.error(`You never commented on that suggestion.`))
                        await dbpull(client, res[0]._id, props.id)
                        dbupdate(res[0].id, { $push: { 'comments': newcomm } })
                        dbfindbyid(res[0]._id).then(async resp => {
                            apprchannel.messages.fetch(resp[0].apprmsgid).then(msg => {
                                msg.edit(client.commentedembed(message, client.users.cache.get(res[0].author), res[0].suggestion, "won", resp[0].upvotes, resp[0].downvotes, resp[0].comments, message.flags[0]))
                            })
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
                    client.editapprovedsuggestion(message, apprchannel, client.users.cache.get(res[0].author), res[0].suggestion, "won", res[0].upvotes, res[0].downvotes, resp[0].comments, message.flags[0], res[0].apprmsgid)
                });
                message.channel.send(client.success(`Successfully deleted your comment: \`\`\`${comment.content}\`\`\``));
            });
        });


    } 

    // sudo mode command model: comment -suggestionid -delete --sudo @Usermention
    

        


            


            function sudofunc() {
                console.log(message.persists)
                // TODO: new level decalrations
                if (level < 3) return;
                if (!message.persists[0]) return message.channel.send(client.error(`You forgot to give a suggestion ID.`))
                if (!message.persists.includes("delete")) return message.channel.send(client.error(`You forgot to pass in the \`--delete\` flag.`))
                const usermention = message.mentions.users.first() || message.guild.members.cache.get(args[0])
                if (!usermention) return message.channel.send(client.error(`Please mention a user.`))
                dbfindbyid(message.persists[0]).then(async res => {
                    console.log(res)
                    if (!res[0]) return message.channel.send(client.error(`This suggestion does not seem to exist.`))
                    if (!res[0].comments || !res[0].comments[0]) return message.channel.send(client.error(`There are no comments on this suggestion yet.`))
                    console.log(typeof res[0].comments)

                    for (const prop of res[0].comments) {
                        console.log(prop.author)
                        if (prop.author === usermention.id) {
                            dbpull(client, res[0]._id, prop.id)
                            dbupdate(res[0]._id, { $push: { 'deletedcomments': prop } })
                            dbfindbyid(res[0]._id).then(resp => {
                            client.editapprovedsuggestion(message, apprchannel, client.users.cache.get(res[0].author), res[0].suggestion, "won", res[0].upvotes, res[0].downvotes, resp[0].comments, message.persists[0], resp[0].apprmsgid) 
                            message.channel.send(client.success(`Successfully deleted the comment: \`\`\`${prop.content}\`\`\`\nby: ${usermention}`));    
                        })

                        } 
                    }

                    // await dbpull(client, res[0]._id, comment.id)
                    // dbupdate(res[0]._id, { $push: { 'deletedcomments': comment } })
                    // dbfindbyid(res[0]._id).then(async resp => {
                    // client.editapprovedsuggestion(message, client.users.cache.get(res[0].author), res[0].suggestion, "won", res[0].upvotes, res[0].downvotes, resp[0].comments, message.flags[0], res[0].msgid)
                    // });
                    // message.channel.send(client.success(`Successfully deleted your comment: \`\`\`${comment.content}\`\`\``));
                })
            }






        

    



}