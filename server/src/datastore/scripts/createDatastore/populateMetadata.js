const muckrockApi = require('./muckrockApi');

const populateAgencies = async (jurisdictions) => {
  console.log(`populate agencies`);
  return Promise.all(jurisdictions.map((jurisdiction) => muckrockApi.getAgencies({ jurisdictionId: jurisdiction.id })))
    .then((agencyLists) => agencyLists.reduce((acc, agencies) => [...acc, ...agencies]));
};

const populateRootJurisdictions = async (rootJurisdictionIds) => {
  console.log(`populate root jurisdictions ${rootJurisdictionIds}`)
  return Promise.all(rootJurisdictionIds.map((id) => muckrockApi.getJurisdiction(id)))
    .then((jurisdictions) => jurisdictions);
};

const populateJurisdictions = async (rootJurisdictions) => {
  console.log(`populate jurisdictions under roots`);
  return Promise.all(rootJurisdictions.map((jurisdiction) => muckrockApi.getJurisdictions({ parentId: jurisdiction.id })))
    .then((jurisdictionLists) => jurisdictionLists.reduce((acc, jurisdictions) => [...acc, ...jurisdictions]));
};

const populateMetadata = async (rootJurisdictionIds) => {
  return populateRootJurisdictions(rootJurisdictionIds)
    .then((rootJurisdictions) => {
      const jurisdictionPromise = populateJurisdictions(rootJurisdictions);
      const agencyPromise = populateAgencies(rootJurisdictions);

      return Promise.all([jurisdictionPromise, agencyPromise])
        .then(([ jurisdictions, agencies ]) => {
          console.log(`found ${agencies.length} agencies and ${jurisdictions.length} jurisdictions under roots`);
          return {
            'agencies': agencies,
            'jurisdictions': [...jurisdictions, ...rootJurisdictions]
          };
        });
    });
};

module.exports = populateMetadata;