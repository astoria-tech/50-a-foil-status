const getPrevData = require("./getPrevData");
const updateFoiaList = require("./updateFoiaList");
const composeUpdatedDataStore = require("./composeUpdatedDataStore");
const writeOutput = require("../writeOutput");

const init = async () => {
  try {
    const prevData = await getPrevData();
    const updatedFoiaList = await updateFoiaList(prevData);
    const newDataStore = composeUpdatedDataStore(updatedFoiaList);

    await writeOutput(newDataStore);
    process.exit();
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        "\nNo datastore found. Do you have a datastore directory containing a JSON datastore?\n"
      );
    }

    console.log(error);
    process.exit(1);
  }
};

init();
