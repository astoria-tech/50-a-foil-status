const fs = require("fs").promises;
const { DATASTORE_PATH: dirname } = require("../constants");

const writeOutput = async (dataStore) => {
  const filename = `${dataStore.meta ? dataStore.meta.runDate : Date.now()}.json`;

  try {
    await fs.mkdir(dirname);
  } catch (error) {
    if (error.code !== "EEXIST") {
      console.log("Unable to write error log file", error);
    }
  }

  try {
    await fs.writeFile(`${dirname}/${filename}`, JSON.stringify(dataStore));
    console.log(`Output written to ${dirname}/${filename}!`);
  } catch (error) {
    console.log("Unable to write error log file", error);
  }
};

module.exports = writeOutput;
