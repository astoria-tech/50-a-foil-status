const axios = require("axios");

axios.defaults.baseURL = "https://www.muckrock.com/api_v1";
axios.defaults.headers["Content-Type"] = "application/json";

const addMetadata = async (foiaList) => {
  process.env.NODE_ENV === "debug" && (foiaList = foiaList.slice(0, 3));

  foiaList = await addAgencyName(foiaList);
  foiaList = await addJurisdictionName(foiaList);

  dataStore = await composeDataStore(foiaList);

  return dataStore;
};

const addAgencyName = async (foiaList) => {
  let result = [];
  for (let i = 0; i < foiaList.length; i++) {
    const agencyId = foiaList[i].agency.id;

    console.log(`Getting data for agency ${agencyId} (${i + 1}/${foiaList.length})`);
    await delay(1000);

    const response = await axios.get(`/agency/${agencyId}`);

    const { foiaReq, agency, jurisdiction } = foiaList[i];

    result.push({
      foiaReq,
      agency: {
        ...agency,
        agencyName: response.data.name,
      },
      jurisdiction: {
        id: response.data.jurisdiction,
      },
    });
  }

  return result;
};

const addJurisdictionName = async (foiaList) => {
  let result = [];
  for (let i = 0; i < foiaList.length; i++) {
    const jursidictionId = foiaList[i].jurisdiction.id;

    console.log(`Getting data for jurisdiction ${jursidictionId} (${i + 1}/${foiaList.length})`);
    await delay(1000);

    const response = await axios.get(`/jurisdiction/${jursidictionId}`);

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

const delay = (interval) => new Promise((resolve) => setTimeout(resolve, interval));

module.exports = addMetadata;
