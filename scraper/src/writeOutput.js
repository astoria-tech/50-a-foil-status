const fs = require("fs").promises;

const writeOutput = async (output) => {
  const dirname = "./output";
  const filename = `${Date.now()}.json`;

  const outputJson = JSON.stringify(output);

  try {
    await fs.mkdir("output");
  } catch (error) {
    if (error.code !== "EEXIST") {
      console.log("Unable to write error log file", error);
    }
  }

  try {
    await fs.writeFile(`${dirname}/${filename}`, outputJson);
    console.log(`Output written to ${dirname}!`);
  } catch (error) {
    console.log("Unable to write error log file", error);
  }
};

module.exports = writeOutput;
