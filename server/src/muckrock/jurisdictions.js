const muckrockApi = require('./api');

const parseJurisdiction = (jurisdiction = {}) => {
  return {
    id: jurisdiction.id,
    name: jurisdiction.name,
    parent: jurisdiction.parent,
    level: jurisdiction.level,
    average_response_time: jurisdiction.average_response_time,
    fee_rate: jurisdiction.fee_rate,
    success_rate: jurisdiction.success_rate,
    absolute_url: jurisdiction.absolute_url,
  };
};

const parseJurisdictions = (jurisdictions = []) => {
  return jurisdictions.map(parseJurisdiction);
};

const retrieveJurisdictionsByIds = async (jurisdictionIds = []) => {
  return Promise.all(jurisdictionIds.map((id) => muckrockApi.getJurisdiction(id)))
    .then((jurisdictions) => parseJurisdictions(jurisdictions));
};

const retrieveJurisdictionsByRootIds = async (rootJurisdictionIds = []) => {
  return Promise.all(rootJurisdictionIds.map((jurisdictionId) => muckrockApi.getJurisdictions({ parentId: jurisdictionId })))
    .then((jurisdictionLists) => jurisdictionLists.reduce((acc, jurisdictions) => [...acc, ...jurisdictions]))
    .then((jurisdictions) => parseJurisdictions(jurisdictions));
};

module.exports = {
  retrieveJurisdictionsByIds: retrieveJurisdictionsByIds,
  retrieveJurisdictionsByRootIds: retrieveJurisdictionsByRootIds
};