var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var port = process.env.PORT || 8080;
var cors = require("cors");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var signUpRouter = require("./routes/sign-up");
var signInRouter = require("./routes/sign-in");
var signOutRouter = require("./routes/sign-out");
var userDataRouter = require("./routes/user-data");
var workoutsRouter = require("./routes/workouts");
var exercisesRouter = require("./routes/exercises");

var app = express();

var configDB = require("./config/database.js");

// configuration ===============================================================
mongoose.connect(
  configDB.url,
  { useNewUrlParser: true }
); // connect to our database

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("client"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/sign-up", signUpRouter);
app.use("/user-data", userDataRouter);
app.use("/sign-in", signInRouter);
app.use("/sign-out", signOutRouter);
app.use("/workouts", workoutsRouter);
app.use("/exercises", exercisesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port);

module.exports = app;
