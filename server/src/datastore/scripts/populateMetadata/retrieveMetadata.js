const { retrieveAllAgencies } = require("../../../muckrock/agencies");
const { retrieveJurisdictionsByIds, retrieveJurisdictionsByRootIds } = require("../../../muckrock/jurisdictions");

const retrieveMetadata = async (rootJurisdictionIds) => {
  console.log(`retrieve root jurisdictions ${rootJurisdictionIds}`);
  const rootJurisdictionPromise = retrieveJurisdictionsByIds(rootJurisdictionIds);

  console.log(`retrieve jurisdictions under roots ${rootJurisdictionIds}`);
  const childJurisdictionPromise = retrieveJurisdictionsByRootIds(rootJurisdictionIds);

  console.log(`retrieve all agencies`);
  const agencyPromise = retrieveAllAgencies();

  return Promise.all([rootJurisdictionPromise, childJurisdictionPromise, agencyPromise])
    .then(([ rootJurisdictions, childJurisdictions, allAgencies ]) => {
      console.log(`found ${allAgencies.length} agencies`);
      console.log(`found ${rootJurisdictions.length} root jurisdictions`);
      console.log(`found ${childJurisdictions.length} jurisdictions under root jurisdictions`);
      const jurisdictions = [...childJurisdictions, ...rootJurisdictions];

      console.log(`filtering agencies by jurisdictions`);
      const agencies = allAgencies.filter((agency) => jurisdictions.find((jurisdiction) => jurisdiction.id === agency.jurisdiction));
      console.log(`found ${agencies.length} agencies under jurisdictions`);
      
      return {
        agencies: agencies,
        jurisdictions: jurisdictions,
        meta: { runDate: Date.now() },
      };
    });
};

module.exports = retrieveMetadata;