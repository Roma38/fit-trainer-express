var express = require("express");
var router = express.Router();
var Exercise = require("../models/exercises");
var User = require("../models/user");

router.get("/", function(req, res, next) {
  User.findOne({ token: req.cookies.token }).then(user => {
    Exercise.find({ user_id: user.id })
      .then(exercises => res.json(exercises))
      .catch(() => res.json({}));
  });
});

router.post("/", function(req, res, next) {
  console.log(req.body);

  User.findOne({ token: req.cookies.token }).then(user => {
    new Exercise({
      name: req.body.exerciseName,
      measurement: req.body.measurement,
      user_id: user.id
    })
      .save()
      .then(() =>
        res.status(201).json({
          name: req.body.exerciseName,
          measurement_type: req.body.measurement,
          user_id: user.id
        })
      );
  });
});

router.put("/", function(req, res, next) {
  return User.findOne({ token: req.cookies.token }).then(user => {
    return Exercise.deleteMany({ user_id: user.id }).then(() => {
      const promises = [];

      req.body.map(({ name, measurement, user_id }) => {
        promises.push(
          new Exercise({
            name,
            measurement,
            user_id
          }).save()
        );
      });

      return Promise.all(promises).then(() => {
        return Exercise.find({ user_id: user.id }).then(exercises => {
          res.json(exercises);
        });
      });
    });
  });
}); // хрень полная...

module.exports = router;
