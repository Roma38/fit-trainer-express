var express = require("express");
var router = express.Router();
var User = require("../models/user");
var UIDGenerator = require("uid-generator");
var uidgen = new UIDGenerator();

router.post("/", function(req, res, next) {
  //console.log(req.body);
  const token = uidgen.generateSync();

  return User.findOne({ email: req.body.email }).then(user => {
    console.log(user);
    if (!user) {
      return res.status(403).json({ error: "Wrong email or password" });
    }
    if (user.password !== req.body.password) {
      return res.status(403).json({ error: "Wrong email or password" });
    }

    return User.findOneAndUpdate({ email: req.body.email }, { token }).then(() => {
      res
        .status(201)
        .header("Access-Control-Allow-Credentials", true)
        .cookie("token", token)
        .json({ email: req.body.email, token });
    });
  });
});

module.exports = router;
