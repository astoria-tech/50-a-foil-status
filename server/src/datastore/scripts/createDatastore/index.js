const getDataByPage = require("./getDataByPage");
const addMetadata = require("./addMetadata");
const writeOutput = require("../writeOutput");

const init = async () => {
  const firstPageUrl =
    "https://www.muckrock.com/api_v1/foia/?page_size=100&user=Officer_Accountability_NY";

  try {
    const foiaDataList = await getDataByPage(firstPageUrl);
    const completeDataList = await addMetadata(foiaDataList);

    await writeOutput(completeDataList);
  } catch (error) {
    console.log(error);
  }
};

init();
