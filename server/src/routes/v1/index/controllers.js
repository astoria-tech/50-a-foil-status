const fs = require("fs").promises;
const path = require("path");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { create } = require("domain");

exports.greeting = asyncHandler(async (req, res, next) => {
  const filepath = path.join(__dirname, "../../../dataStore/data.json");
  const dataStore = await fs.readFile(filepath, "utf8");
  if (!dataStore) throw createError(500, `Unable to read data store`);

  res.json(JSON.parse(dataStore));
});
