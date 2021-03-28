const { DATASTORE_PATH } = require("../../../datastore/scripts/constants")
const read = require("../../../datastore/fileDatastore/read")
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");

exports.getLatestData = asyncHandler(async (req, res, next) => {
  console.log(DATASTORE_PATH)
  try {
    return read(DATASTORE_PATH)
      .then((dataStore) => {
        return res.json(dataStore);
      });
  } catch (error) {
    console.error(error);
    throw createError(500, `Unable to read datastore`);
  }
});