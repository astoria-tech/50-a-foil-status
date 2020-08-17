const express = require("express");
const router = express.Router();

const indexRouter = require("./index/routes");

router.use("/", indexRouter);

module.exports = router;
