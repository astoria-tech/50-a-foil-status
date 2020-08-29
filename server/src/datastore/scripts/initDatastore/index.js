const getDataByPage = require("./scrapeData");
const addMetadata = require("./addMetadata");
const writeOutput = require("../writeOutput");

const init = async () => {
  const firstPageUrl =
    "https://www.muckrock.com/foi/list/?per_page=100&projects=778&page=1";

  try {
    const foiaRequestIdList = await getDataByPage(firstPageUrl);

    console.log(`IDs for ${foiaRequestIdList.length} FOIA requests collected.`);

    const dataStore = await addMetadata(foiaRequestIdList);

    await writeOutput(dataStore);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

init();
