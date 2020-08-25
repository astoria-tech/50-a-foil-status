const fs = require("fs").promises;
const path = require("path");
const { DATASTORE_PATH: dir } = require("../constants");

const getPrevData = async () => {
  const filename = await getMostRecentFilename(dir);
  const dataStore = await fs.readFile(path.join(dir, filename), "utf8");
  const prevData = JSON.parse(dataStore);

  return prevData;
};

const getMostRecentFilename = async (dir) => {
  const filenames = await orderRecentFilenames(dir);
  return filenames ? filenames[0] : undefined;
};

const orderRecentFilenames = async (dir) => {
  const filenamesList = await readFilenames(dir);

  const sortedFilenames = filenamesList.sort(
    (a, b) => b.split(".json").join("") - a.split(".json").join("")
  );

  return sortedFilenames;
};

const readFilenames = async (dir) => {
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

module.exports = getPrevData;
