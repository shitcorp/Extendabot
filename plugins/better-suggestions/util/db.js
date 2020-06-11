const mongoose = require('mongoose');
const { VoiceState } = require('discord.js');
const { timeout } = require('cron');
mongoose.connect("mongodb://localhost/suggestions", { useNewUrlParser: true , useUnifiedTopology: true });




 const suggestionschema = new mongoose.Schema({
   _id: String,
   suggestion: String,
   author: String,
   time: { type: Date, default: Date.now },
   systemtime: String,
   approved: Boolean,
   expires: String,
   upvotes: Number,
   downvotes: Number,
   msgid: String,
   apprmsgid: String
 });


 const Suggestionmodel = mongoose.model("Suggestion", suggestionschema);

 const configschema = new mongoose.Schema({
   _id: String,
   suggestions_channel: String,
   approved_channel: String,
   commandchannel: String,
   max_vote_timeout_in_days: Number,
   cooldown_in_minutes: Number,
   keywords: Array,
   staffrole: String,
   deafult_vote_timeout_in_minutes: Number,
   defaultembed: String,
   approvedembed: String
 })

 const Suggestionconfigmodel = new mongoose.model("Suggestionconfig", configschema)







module.exports = {
    
    dbinit: () => {
        var db = mongoose.connection;
        db.on(
          "error",
          console.error.bind(
            console,
            ">>>>>>>>>>>>>>>>>>>>>>>>> (!) Mongo DB Connection error:"
          )
        );

        db.once("open", function () {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  Mongo DB connection was established.");
        });
    },
    configpush: async (config) => {
      const suggestionconfig = new Suggestionconfigmodel(config)
      suggestionconfig.save(function(err) {
        if (err) return err;
      });
    },
    configget: async (ID) => {
      return Suggestionconfigmodel.find({_id: ID});
    },
    configupdate: async (ID, obj) => {
      Suggestionconfigmodel.updateOne({_id: ID}, obj, function(err, affected) {
        if (err) return err;
      })
    },
    dbpush: (suggestion) => {

        const usersuggestion = new Suggestionmodel(suggestion)
        usersuggestion.save(function (err) {
            if (err) return err
        });

    },
    dbupdate: (ID, obj) => {
        Suggestionmodel.updateOne({_id: ID}, obj, function(err, affected, resp) {
            if(err) return err
        });
    },
    dbfindmultiplebyid: async (ID) => {
                                Suggestionmodel.find({ author: ID })
                                  .limit(25)
                                  .sort("time");
                                  let output = 0;
                                for await (const doc of Suggestionmodel.find({author: ID})) {
                                  console.log(doc); // Prints documents one at a time
                                  output++
                                }
                                return output
                              },

    dbfindbyid: async (ID) => {
        return Suggestionmodel.find({_id: ID});
    }
}