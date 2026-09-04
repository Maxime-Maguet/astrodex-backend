require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const { connectDb } = require("./models/connection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var astresRouter = require("./routes/astres");
var weatherRouter = require("./routes/weather");

var app = express();

app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/favicon.png", (req, res) => res.status(204).end());

const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    limits: { fileSize: 8 * 1024 * 1024 },
    abortOnLimit: true,
  }),
);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    res.status(503).json({ result: false, error: "Database unavailable" });
  }
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/astres", astresRouter);
app.use("/weather", weatherRouter);

module.exports = app;
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
