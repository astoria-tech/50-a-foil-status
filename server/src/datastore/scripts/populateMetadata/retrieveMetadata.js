const { retrieveAllAgencies } = require("../../../muckrock/agencies");
const { retrieveJurisdictionsByIds, retrieveJurisdictionsByRootIds } = require("../../../muckrock/jurisdictions");

const retrieveMetadata = async (rootJurisdictionIds) => {
  console.log(`retrieve root jurisdictions ${rootJurisdictionIds}`);
  return retrieveJurisdictionsByIds(rootJurisdictionIds)
    .then((rootJurisdictions) => {
      console.log(`found ${rootJurisdictions.length} root jurisdictions`);
      console.log(`retrieve jurisdictions under root jurisdictions`);
      return retrieveJurisdictionsByRootIds(rootJurisdictionIds)
        .then((childJurisdictions) => {
          console.log(`found ${childJurisdictions.length} jurisdictions under root jurisdictions`);
          return [...childJurisdictions, ...rootJurisdictions];
        });
    })
    .then((jurisdictions) => {
      console.log(`retrieve all agencies`);
      return retrieveAllAgencies()
        .then((allAgencies) => {
          console.log(`filtering agencies by jurisdictions`);
          const agencies = allAgencies.filter((agency) => jurisdictions.find((jurisdiction) => jurisdiction.id === agency.jurisdiction));
          console.log(`found ${agencies.length} agencies under jurisdictions`);

          return {
            agencyData: { 
              agencies: agencies,
              meta: { runDate: Date.now() }
            },
            jurisdictionData: { 
              jurisdictions: jurisdictions,
              meta: { runDate: Date.now() }
            },
          };
        });
    });
};

module.exports = retrieveMetadata;