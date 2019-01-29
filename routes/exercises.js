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
  console.log(req.body);
  return User.findOne({ token: req.cookies.token }).then(user => {
    //находим юзера по токену
    return Exercise.find({ user_id: user.id }).then(exercises => {
      //находим упражнения этого юзера
      const promises = [];
      console.log("EXERCISES:", exercises);
      exercises.map(item => {
        //перебераем все упражнения
        const newExercise = req.body.find(({ _id }) => _id === item.id); //ищем в теле запроса соответствующие по id упражнения
        newExercise //если находим
          ? promises.push(
              Exercise.findByIdAndUpdate(
                //обновляем его
                item._id,
                {
                  name: newExercise.name,
                  measurement: newExercise.measurement
                }
              )
            )
          : promises.push(Exercise.findByIdAndDelete(item._id)); //если нет - удаляем
      });

      return Promise.all(promises).then(() => {
        return Exercise.find({ user_id: user.id }).then(exercises => {
          res.json(exercises);
        });
      });
    });
  });
}); // ПОРЕФАКТОРИТЬ

module.exports = router;
