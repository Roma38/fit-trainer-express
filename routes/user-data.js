var express = require("express");
var router = express.Router();

var User = require("../models/user");

router.get("/", function(req, res, next) {
  console.log(req.cookies.token);
  User.findOne({ token: req.cookies.token }).then(user => {
    if (user) {
      return res
        .status(200)
        .json({ email: user.email, token: user.token });
    }
    res.status(401).json({});
  });
});

module.exports = router;
