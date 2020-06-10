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

exports.run = async (client, message, args, level) => {
const config = require('../config.json')
const uniqid = require('uniqid');
const systime = Date.now();
var handle = require('../util/db')

var expires = systime + config["vote-timeout-in-minutes"];
if (args[0].includes("h")) {
  let toparse = args[0].replace("h", "");
  let parsed = parseInt(toparse);
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
  args.shift();
} else if (args[0].includes("d")) {
  let toparse = args[0].replace("d", "");
  let parsed = parseInt(toparse);
  if (parsed > config["max-vote-timeout-in-days"]) return message.channel.send(client.error(`Your vote timeout cannot be greater than ${config["max-vote-timeout-in-days"]} days.`)).then(msg => { msg.delete({timeout: 60000}).catch(console.error) })
  console.log(parsed);
  args.shift();
  expires = systime + 86400000 * parsed;
}

 
 const suggestiontext = args.join(' ');
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

 


 await handle.dbpush(suggestion)

 message.channel.send(`Suggestion: ${suggestiontext} ,with the ID: ${suggestionID} was registered.`)


}