const axios = require("axios");

axios.defaults.baseURL = "https://www.muckrock.com/api_v1";
axios.defaults.headers["Content-Type"] = "application/json";

const updateFoiaList = async (prevData) => {
  const { foiaList } = prevData;

  let updatedFoiaList = [];
  for (let i = 0; i < foiaList.length; i++) {
    console.log(`Getting data for foia req ${i + 1}/${foiaList.length}`);

    await delay(1000);

    const { foiaReq, ...rest } = foiaList[i];
    const { data: newData } = await axios.get(`/foia/${foiaReq.id}`);

    const updatedFoiaReq = {
      ...foiaReq,
      status: newData.status,
      datetime_done: newData.datetime_done || null,
      price: newData.price,
    };

    updatedFoiaList.push({
      foiaReq: updatedFoiaReq,
      ...rest,
    });
  }

  return updatedFoiaList;
};

const delay = (interval) =>
  new Promise((resolve) => setTimeout(resolve, interval));

module.exports = updateFoiaList;
