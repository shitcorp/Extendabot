// const samplesuggestion = new Suggestionmodel({
//   _id: "1123456",
//   suggestion: "Something creative",
//   author: "Meer",
//   systemtime: `${new Date()}`,
//   approved: true,
//   expires: "121212121212",
//   upvotes: "5",
//   downvotes: "1",
// });
const suggestioncache = new Set();
exports.run = async (client, message, args, level) => {
    
const config = require('../config.json')
const uniqid = require('uniqid');
const systime = Date.now();
var handle = require('../util/db')

var expires = systime + 6000*config["vote-timeout-in-minutes"];

if (message.flags[0]) {
if (message.flags[0].includes("h")) {
  let toparse = message.flags[0].replace("h", "");
  let parsed = parseInt(toparse);
  console.log(parsed)
  if (parsed > 24) return message.channel
                     .send(
                       client.error(
                         `Your vote timeout cant be greater than 24hrs.`
                       )
                     )
                     .then((msg) => {
                       msg.delete({ timeout: 60000 }).catch(console.error);
                     });
  console.log(parsed);
  expires = systime + 3600000 * parsed;
  
} else if (message.flags[0].includes("d")) {
  let toparse = message.flags[0].replace("d", "");
  let parsed = parseInt(toparse);
  if (parsed > config["max-vote-timeout-in-days"]) return message.channel.send(client.error(`Your vote timeout cannot be greater than ${config["max-vote-timeout-in-days"]} days.`)).then(msg => { msg.delete({timeout: 60000}).catch(console.error) })
  console.log(parsed);
  
  expires = systime + 86400000 * parsed;
}
}

 
 const suggestiontext = args.join(' ');

 if (suggestiontext.length > 1999)
   return message.channel
     .send(
       client.error(
         `Your suggestion text was too long. You used \`${suggestiontext.length}\` out of \`1999\` allowed characters. \nPlease try again.`
       )
     )
     .then((msg) => {
       msg.delete({ timeout: 60000 }).catch(console.error);
     });

 const suggestionID = uniqid(); 
 
 console.log(systime, `${systime}`)
 const suggestion = {
   _id: `${suggestionID}`,
   suggestion: `${suggestiontext}`,
   author: `${message.author.id}`,
   systemtime: `${systime}`,
   approved: false,
   expires
 };

 const { formatDistance, format } = require('date-fns')

 console.log(formatDistance(new Date(), expires))
 console.log(systime, expires)
 console.log(
   format(systime, "H/m/dd/MM/yyyy"),
   format(expires, "dd/MM/yyyy | H:m"));
const stringo = `${ formatDistance(new Date(), expires ) }`

 await handle.dbpush(suggestion)

 message.channel
   .send(
     client.newsuggestion(
       message,
       suggestiontext,
       `~ ${stringo}  (${format(expires, "dd/MM/yyyy | H:m")}h)`,
       suggestionID
     )
   )
   .then(async (msg) => {
     await msg.react("✅")
     await msg.react("❌")
     handle.dbupdate(suggestionID, { msgid: `${msg.id}` });
     suggestioncache.add(message.author.id);
   })
   


}