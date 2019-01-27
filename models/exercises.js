var mongoose = require("mongoose");

// define the schema for our exercise model
var exerciseSchema = mongoose.Schema({
  name: String,
  measurement_type: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

// methods ======================


// create the model for exercises and expose it to our app
module.exports = mongoose.model("Exercise", exerciseSchema);
