var express = require("express");
var router = express.Router();
var User = require("../models/user");
var UIDGenerator = require("uid-generator");
var uidgen = new UIDGenerator();

router.post("/", function(req, res, next) {
  return User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(409).json({ error: "This email registrated already" });
    }
    const token = uidgen.generateSync();

    const { email, password } = req.body;

    return new User({ email, password, token }).save().then(() =>
      res
        .status(201)
        .header("Access-Control-Allow-Credentials", true)
        .cookie("token", token)
        .json({ email: req.body.email, token })
    );
  });
});

module.exports = router;
