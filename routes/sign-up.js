var express = require("express");
var router = express.Router();
var User = require("../models/user");
var UIDGenerator = require("uid-generator");
var uidgen = new UIDGenerator();

router.post("/", function(req, res, next) {
  console.log(req.body);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(409).json({error: "This email registrated already"});
    }
    const token = uidgen.generateSync();
    console.log(token)

    new User({ email: req.body.email, password: req.body.password, token })
      .save()
      .then(() =>
        res
          .status(201)
          .cookie("token", token)
          .send({ email: req.body.email, token })
      );
  });
});

module.exports = router;
