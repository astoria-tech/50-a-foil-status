const getDataByPage = require("./scrapeData");
const addMetadata = require("./addMetadata");
const writeOutput = require("./writeOutput");

const init = async () => {
  try {
    const foiaRequestIdList = await getDataByPage(
      "https://www.muckrock.com/foi/list/?per_page=100&projects=778&page=1"
    );

    console.log(`IDs for ${foiaRequestIdList.length} FOIA requests collected.`);

    const foiaRequestMetadataList = await addMetadata(foiaRequestIdList);

    writeOutput(foiaRequestMetadataList);
    // writeOutput(foiaRequestIdList);
  } catch (error) {
    console.log(error);
  }
};

init();
