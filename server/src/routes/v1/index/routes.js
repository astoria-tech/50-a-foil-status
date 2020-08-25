const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

router.get("/latest", controllers.getLatestData);

module.exports = router;
