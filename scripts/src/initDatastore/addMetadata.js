const axios = require("axios");

axios.defaults.baseURL = "https://www.muckrock.com/api_v1";
axios.defaults.headers["Content-Type"] = "application/json";

const addMetadata = async (foiaList) => {
  process.env.NODE_ENV === "debug" && (foiaList = foiaList.slice(0, 3));

  foiaList = await addRequestMetadata(foiaList);
  foiaList = await addAgencyName(foiaList);
  foiaList = await addJurisdictionName(foiaList);

  dataStore = await composeDataStore(foiaList);

  return dataStore;
};

const addRequestMetadata = async (foiaList) => {
  let result = [];
  for (let i = 0; i < foiaList.length; i++) {
    console.log(`Getting data for foia req ${i + 1}/${foiaList.length}`);

    await delay(1000);

    const response = await axios.get(`/foia/${foiaList[i].foiaReq.id}`);

    const { foiaReq, jurisdiction } = foiaList[i];

    result.push({
      foiaReq: {
        ...foiaReq,
        status: response.data.status,
        datetime_submitted: response.data.datetime_submitted,
        datetime_done: response.data.datetime_done || null,
        price: response.data.price,
        absolute_url: response.data.absolute_url,
      },
      agency: {
        id: response.data.agency,
      },
      jurisdiction,
    });
  }

  return result;
};

const addAgencyName = async (foiaList) => {
  let result = [];
  for (let i = 0; i < foiaList.length; i++) {
    console.log(`Getting data for agency ${i + 1}/${foiaList.length}`);
    await delay(1000);

    const response = await axios.get(`/agency/${foiaList[i].agency.id}`);

    const { foiaReq, agency, jurisdiction } = foiaList[i];

    result.push({
      foiaReq,
      agency: {
        ...agency,
        agencyName: response.data.name,
      },
      jurisdiction,
    });
  }

  return result;
};

const addJurisdictionName = async (foiaList) => {
  let result = [];
  for (let i = 0; i < foiaList.length; i++) {
    console.log(`Getting data for jurisdiction ${i + 1}/${foiaList.length}`);
    await delay(1000);

    const response = await axios.get(
      `/jurisdiction/${foiaList[i].jurisdiction.id}`
    );

    const { foiaReq, agency, jurisdiction } = foiaList[i];

    result.push({
      foiaReq,
      agency,
      jurisdiction: {
        ...jurisdiction,
        jurisdictionName: response.data.name,
      },
    });
  }

  return result;
};

const composeDataStore = (foiaList) => {
  const meta = {
    runDate: Date.now(),
  };

  return {
    meta,
    foiaList,
  };
};

const delay = (interval) =>
  new Promise((resolve) => setTimeout(resolve, interval));

module.exports = addMetadata;
