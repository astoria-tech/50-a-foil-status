const fs = require("fs").promises;
const path = require("path");

const writeOutput = async (dataStore) => {
  const dirname = path.join(__dirname, "../../datastore");
  const filename = `${dataStore.meta.runDate}.json`;

  try {
    await fs.mkdir(dirname);
  } catch (error) {
    if (error.code !== "EEXIST") {
      console.log("Unable to write error log file", error);
    }
  }

  try {
    await fs.writeFile(`${dirname}/${filename}`, JSON.stringify(dataStore));
    console.log(`Output written to ${dirname}!`);
  } catch (error) {
    console.log("Unable to write error log file", error);
  }
};

module.exports = writeOutput;
