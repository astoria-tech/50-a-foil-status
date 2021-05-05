require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./logger");

const app = express();
app.set("query parser", "simple");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev", { stream: logger.stream }));
}
app.use(helmet());
app.use(cors(require("./config/cors")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1", require("./routes/v1"));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
