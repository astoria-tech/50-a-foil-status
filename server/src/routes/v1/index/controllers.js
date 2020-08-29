const fs = require("fs").promises;
const path = require("path");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");

exports.getLatestData = asyncHandler(async (req, res, next) => {
  const dir = path.join(__dirname, "../../../datastore/data");

  const filename = await _getMostRecentFilename(dir);
  if (!filename) throw createError(500, `Unable to get latest datastore filename`);

  const dataStore = await fs.readFile(path.join(dir, filename), "utf8");
  if (!dataStore) throw createError(500, `Unable to read datastore`);

  res.json(JSON.parse(dataStore));
});

const _getMostRecentFilename = async (dir) => {
  const filenames = await _orderRecentFilenames(dir);
  return filenames ? filenames[0] : undefined;
};

const _orderRecentFilenames = async (dir) => {
  const filenamesList = await _readFilenames(dir);

  const sortedFilenames = filenamesList.sort(
    (a, b) => b.split(".json").join("") - a.split(".json").join("")
  );

  return sortedFilenames;
};

const _readFilenames = async (dir) => {
  const dirContents = await fs.readdir(dir);

  // filter out directories
  const filenamesList = await Promise.all(
    await dirContents.filter(async (file) => {
      const stats = await fs.lstat(path.join(dir, file));
      return stats.isFile();
    })
  );

  return filenamesList;
};
