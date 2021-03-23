const { AGENCIES_PATH, JURISDICTIONS_PATH } = require("../constants");
const { parseAgencies } = require("../../../muckrock/agencies");
const { parseJurisdictions } = require("../../../muckrock/jurisdictions");
const read = require("../../fileDatastore/read");

const readMetadata = async () => {
  const agencyDataPromise = read(AGENCIES_PATH);
  const jurisdictionDataPromise = read(JURISDICTIONS_PATH);

  return Promise.all([agencyDataPromise, jurisdictionDataPromise])
    .then(([agencyData, jurisdictionData]) => {
      const agencies = parseAgencies(agencyData.agencies);
      const jurisdictions = parseJurisdictions(jurisdictionData.jurisdictions);

      return {
        agencyData: {
          agencies: agencies
        },
        jurisdictionData: {
          jurisdictions: jurisdictions
        }
      };
    });
};

module.exports = readMetadata;