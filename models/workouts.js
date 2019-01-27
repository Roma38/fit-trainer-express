var mongoose = require("mongoose");

// define the schema for our workout model
var workoutSchema = mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: Date,
  program: [
    {
      exercise_id: {
        type: Schema.Types.ObjectId,
        ref: "exercises"
      },
      repaeats: Number,
      measurement: Number
    }
  ]
});

// methods ======================

// create the model for workouts and expose it to our app
module.exports = mongoose.model("Workout", workoutSchema);
