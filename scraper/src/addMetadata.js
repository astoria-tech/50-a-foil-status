const axios = require("axios");

axios.defaults.baseURL = "https://www.muckrock.com/api_v1";
axios.defaults.headers["Content-Type"] = "application/json";

const addMetadata = async (foiaRequestIdList) => {
  // foiaRequestIdList = foiaRequestIdList.slice(0, 3);

  foiaRequestIdList = await addRequestMetadata(foiaRequestIdList);
  foiaRequestIdList = await addAgencyName(foiaRequestIdList);
  foiaRequestIdList = await addJurisdictionName(foiaRequestIdList);

  return foiaRequestIdList;
};

const addRequestMetadata = async (list) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    console.log(`Getting data for foia req ${i + 1}/${list.length}`);

    await delay(1000);

    const response = await axios.get(`/foia/${list[i].foiaReq.id}`);

    const { foiaReq, jurisdiction } = list[i];

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

const addAgencyName = async (list) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    console.log(`Getting data for agency ${i + 1}/${list.length}`);
    await delay(1000);

    const response = await axios.get(`/agency/${list[i].agency.id}`);

    const { foiaReq, agency, jurisdiction } = list[i];

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

const addJurisdictionName = async (list) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    console.log(`Getting data for jurisdiction ${i + 1}/${list.length}`);
    await delay(1000);

    const response = await axios.get(
      `/jurisdiction/${list[i].jurisdiction.id}`
    );

    const { foiaReq, agency, jurisdiction } = list[i];

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

const delay = (interval) =>
  new Promise((resolve) => setTimeout(resolve, interval));

module.exports = addMetadata;
