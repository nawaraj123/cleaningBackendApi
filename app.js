var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");

const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const auth = require("./auth");

var indexRouter = require("./routes/index");
var blockIndexRouter = require("./routes/block/index");
var locationIndexRouter = require("./routes/location/index");
var taskLogIndexRouter = require("./routes/taskLog/index");
var reportIndexRouter = require("./routes/report/index");

var app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/", indexRouter);
app.use("/block", auth, blockIndexRouter);
app.use("/location", auth, locationIndexRouter);
app.use("/tasklog", auth, taskLogIndexRouter);
app.use("/report", auth, reportIndexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
  // res.render("error");
});

module.exports = app;
