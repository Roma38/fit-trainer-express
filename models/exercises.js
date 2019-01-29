var mongoose = require("mongoose");

// define the schema for our exercise model
var exerciseSchema = mongoose.Schema({
  name: String,
  measurement: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

// create the model for exercises and expose it to our app
module.exports = mongoose.model("Exercise", exerciseSchema);
