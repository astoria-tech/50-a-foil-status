const fs = require("fs").promises;
const path = require("path");

const _getMostRecentFilename = async (dir) => {
  const filenames = await _orderRecentFilenames(dir);
  const idx = filenames.length - 1;

  return filenames ? filenames[idx] : undefined;
};

const _orderRecentFilenames = async (dir) => {
  const filenamesList = await _readFilenames(dir);

  const sortedFilenames = filenamesList.sort((a, b) => a.localeCompare(b));

  return sortedFilenames;
};

const _readFilenames = async (dir) => {
  const dirContents = await fs.readdir(dir);

  // filter out directories
  return await Promise.all(
    await dirContents.filter(async (file) => {
      const stats = await fs.lstat(path.join(dir, file));
      return stats.isFile();
    })
  );
};

const read = async (dirname) => {
  const datastoreFilename = await _getMostRecentFilename(dirname);
  const fileContent = await fs.readFile(`${dirname}/${datastoreFilename}`, {
    encoding: "utf8",
  });
  return JSON.parse(fileContent);
};

module.exports = read;