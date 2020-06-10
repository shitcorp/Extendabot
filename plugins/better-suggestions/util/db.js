const mongoose = require('mongoose');
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

 // TODO: update mdgid on approval

 const Suggestionmodel = mongoose.model("Suggestion", suggestionschema);









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
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  Mongo DB connection sucesfull");

          const samplesuggestion = new Suggestionmodel({
            _id: "1123456",
            suggestion: "Something creative",
            author: "Meer",
            systemtime: `${new Date()}`,
            approved: true,
            expires: "121212121212",
            upvotes: "5",
            downvotes: "1",
          });
        });




    },
    dbpush: (suggestion) => {

        const usersuggestion = new Suggestionmodel(suggestion)
        usersuggestion.save(function (err) {
            if (err) return console.error(err); 
        })

    }
}