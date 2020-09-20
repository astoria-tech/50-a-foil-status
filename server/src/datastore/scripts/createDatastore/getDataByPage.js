const axios = require("axios");

const getDataByPage = async (url, compositeDataList = []) => {
  console.log("Getting data from", url);

  const response = await axios.get(url);
  const foiaRequestDataObjects = response.data.results;
  const filteredDataObjects = filterDataObjects(foiaRequestDataObjects);
  compositeDataList = compositeDataList.concat(filteredDataObjects);

  // If there's no next page of data, return the composite compositeDataList
  if (!response.data.next || process.env.DATA_LEVEL === "low") {
    console.log(`Data for ${compositeDataList.length} FOIA requests collected.`);
    return compositeDataList;
  } else {
    // Else recurse to the next page of data
    return getDataByPage(response.data.next, compositeDataList);
  }
};

const filterDataObjects = (foiaRequestDataObjects) => {
  return foiaRequestDataObjects.map((foiaRequest) => {
    const {
      id,
      status,
      datetime_submitted,
      datetime_done,
      price,
      absolute_url,
      agency,
    } = foiaRequest;

    return {
      foiaReq: {
        id,
        status,
        datetime_submitted,
        datetime_done,
        price,
        absolute_url,
      },
      agency: {
        id: agency,
      },
    };
  });
};

module.exports = getDataByPage;
