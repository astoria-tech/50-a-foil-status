const fs = require("fs").promises;
const path = require("path");
const writeOutput = require("../writeOutput");

const refDataDirPath = path.join(__dirname, "../../referenceData");

const copyDatastore = async () => {
  const datastoreFilename = await _getMostRecentFilename(refDataDirPath);
  const fileContent = await fs.readFile(`${refDataDirPath}/${datastoreFilename}`, {
    encoding: "utf8",
  });
  const jsonContent = JSON.parse(fileContent);

  await writeOutput(jsonContent);
};

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
  const filenamesList = await Promise.all(
    await dirContents.filter(async (file) => {
      const stats = await fs.lstat(path.join(dir, file));
      return stats.isFile();
    })
  );

  // filter out unneeded files
  const filteredFilenamesList = filenamesList.filter((filename) =>
    filename.startsWith("fullDatastore")
  );

  return filteredFilenamesList;
};

(async function init() {
  await copyDatastore();
})();
