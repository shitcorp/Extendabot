const mongoose = require('mongoose');
const { VoiceState } = require('discord.js');
const { timeout } = require('cron');
mongoose.connect("mongodb://localhost/suggestions", { useNewUrlParser: true, useUnifiedTopology: true });

const suggestionschema = new mongoose.Schema({
  _id: String,
  guildid: String,
  suggestion: String,
  author: String,
  time: { type: Date, default: Date.now },
  systemtime: String,
  approved: Boolean,
  expires: String,
  upvotes: Number,
  downvotes: Number,
  msgid: String,
  apprmsgid: String,
  comments: Array,
  deletedcomments: Array
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
  votetimeout: Number,
  defaultembed: String,
  approvedembed: String
})

const Suggestionconfigmodel = new mongoose.model("Suggestionconfig", configschema)

const bugconfschema = new mongoose.Schema({
  _id: String,
  enabled: Boolean,
  postbugsondiscord: Boolean,
  bug_channel: String,
  defaultembed: String,
  allowcomments: Boolean
})

const bugconfmodel = new mongoose.model("Bugconf", bugconfschema)

const Bugschema = new mongoose.Schema({
  _id: String,
  guildid: String,
  author: String,
  content: String,
  time: { type: Date, default: Date.now },
  systemtime: String,
  severity: Number,
  comments: Array,
  deletedcomments: Array
})

const issues = new mongoose.model("Issues", Bugschema)

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
    suggestionconfig.save(function (err) {
      if (err) return err;
    });
  },
  configget: async (ID) => {
    return Suggestionconfigmodel.find({ _id: ID });
  },
  configupdate: async (ID, obj) => {
    Suggestionconfigmodel.updateOne({ _id: ID }, obj, function (err, affected) {
      if (err) return err;
    })
  },
  bugconfpush: async (config) => {
    const bugconf = new bugconfmodel(config);
    bugconf.save(function (err) {
      if (err) return err;
    });
  },
  bugconfupdate: async (ID, obj) => {
    bugconfmodel.updateOne({ _id: ID }, obj, function (err, affected) {
      if (err) return err;
      if (affected) return affected;
    })
  },
  dbpush: (suggestion) => {

    const usersuggestion = new Suggestionmodel(suggestion)
    usersuggestion.save(function (err) {
      if (err) return err
    });

  },
  dbupdate: (ID, obj) => {
    Suggestionmodel.updateOne({ _id: ID }, obj, function (err, affected, resp) {
      if (err) return err
    });
  },
  dbpull: async (client, ID, pullid) => {
    Suggestionmodel.updateOne(
      { _id: ID }, { "$pull": { "comments": { "id": pullid } } },
      { safe: true }, function (err, obj) {
        if (err) return client.logger.debug(err)
        if (obj) return client.logger.debug(obj)
      });
  },
  dbfindmultiplebyid: async (ID) => {
    Suggestionmodel.find({ author: ID })
      .limit(25)
      .sort("time");
    let output = 0;
    for await (const doc of Suggestionmodel.find({ author: ID })) {
      console.log(doc); // Prints documents one at a time
      output++
    }
    return output
  },
  dbfindbyid: async (ID) => {
    return Suggestionmodel.find({ _id: ID });
  },
  dbfindbyguild: async (ID) => {
    return Suggestionmodel.find({ guildid: ID }).limit(100).sort("systime");
  },
}