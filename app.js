var createError = require("http-errors");
var expressLayouts = require("express-ejs-layouts");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var homeRouter = require("./routes");
var usersRouter = require("./routes/users");
var contactusRouter = require("./routes/contactus");
var tradesRouter = require("./routes/trades");
var createRouter = require("./routes/create");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
// app.(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/contactus", contactusRouter);
app.use("/trades", tradesRouter);
app.use("/create", createRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//init gridfs
let gfs;

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect(
    "mongodb+srv://abdi:k4t5rk0o1@servercluster.q691c.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to mongo..."))
  .catch((error) => console.log(error.message));

var conn = mongoose.createConnection(
  "mongodb+srv://abdi:k4t5rk0o1@servercluster.q691c.mongodb.net/?retryWrites=true&w=majority"
);
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads')
  // all set!
});

//create storage engine


module.exports = app;
