var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
  res
    .status(201)
    .header("Access-Control-Allow-Credentials", true)
    .cookie("token", req.cookies.token, {
      expires: new Date(0)
    })
    .json({ });   //setting expired cookie
});

module.exports = router;
