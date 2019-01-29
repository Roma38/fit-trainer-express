var express = require("express");
var router = express.Router();
var Workout = require("../models/workouts");
var User = require("../models/user");

router.get("/", function(req, res, next) {
  User.findOne({ token: req.cookies.token }).then(user => {
    Workout.find({ user_id: user.id })
      .then(workouts => res.json(workouts))
      .catch(() => res.json({}));
  });
});

router.post("/", function(req, res, next) {
  const { date, program } = req.body;
  User.findOne({ token: req.cookies.token }).then(user => {
    new Workout({
      user_id: user.id,
      date,
      program
    })
      .save()
      .then(() =>
        res.status(201).json({
          user_id: user.id,
          date,
          program
        })
      );
  });
});

router.put("/", function(req, res, next) {
  console.log(req.body);
  const { date, program } = req.body;
  User.findOne({ token: req.cookies.token }).then(user => {
    Workout.findOneAndUpdate(
      {
        user_id: user.id,
        date: date
      },
      { program }
    ).then(workout => {
      console.log(workout);
      return res.status(201).json(workout);
    });
  });
});

module.exports = router;
