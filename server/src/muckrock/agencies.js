const muckrockApi = require('./api');

const parseAgency = (agency = {}) => {
  return {
    id: agency.id.toString(),
    name: agency.name,
    absolute_url: agency.absolute_url,
    jurisdiction: agency.jurisdiction.toString(),
    appeal_agency: agency.appeal_agency,
    parent: agency.parent,
    average_response_time: agency.average_response_time,
    fee_rate: agency.fee_rate,
    success_rate: agency.success_rate,
  };
};

const parseAgencies = (agencies = []) => {
  return agencies.map(parseAgency);
};

const retrieveAgenciesByIds = async (agencyIds = []) => {
  return Promise.all(agencyIds.map((agencyId) => muckrockApi.getAgency(agencyId)))
    .then((agencies) => parseAgencies(agencies));
}

const retrieveAgenciesByJurisdictionIds = async (jurisdictionIds = []) => {
  return Promise.all(jurisdictionIds.map((jurisdictionId) => muckrockApi.getAgencies({ jurisdictionId: jurisdictionId })))
    .then((agencyLists) => agencyLists.reduce((acc, agencies) => [...acc, ...agencies]))
    .then((agencies) => parseAgencies(agencies));
};

const retrieveAllAgencies = async () => {
  return muckrockApi.getAgencies()
    .then((agencies) => parseAgencies(agencies));
};

module.exports = {
  parseAgencies: parseAgencies,
  retrieveAgenciesByIds: retrieveAgenciesByIds,
  retrieveAgenciesByJurisdictionIds: retrieveAgenciesByJurisdictionIds,
  retrieveAllAgencies: retrieveAllAgencies
};