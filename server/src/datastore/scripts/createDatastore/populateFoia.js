const muckrockApi = require('./muckrockApi');

const parseFoiaRequest = (foiaRequest = {}) => {
  return {
    id: foiaRequest.id,
    status: foiaRequest.status,
    datetime_submitted: foiaRequest.datetime_submitted,
    datetime_done: foiaRequest.datetime_done,
    price: foiaRequest.price,
    absolute_url: foiaRequest.absolute_url,
  }
};

const parseAgency = (agency = {}) => {
  return {
    id: agency.id,
    name: agency.name,
    average_response_time: agency.average_response_time,
    fee_rate: agency.fee_rate,
    success_rate: agency.success_rate,
    absolute_url: agency.absolute_url,
  };
};

const parseJurisdiction = (jurisdiction = {}) => {
  return {
    id: jurisdiction.id,
    name: jurisdiction.name,
    average_response_time: jurisdiction.average_response_time,
    fee_rate: jurisdiction.fee_rate,
    success_rate: jurisdiction.success_rate,
    absolute_url: jurisdiction.absolute_url,
  };
};

const populateFoia = async (username, agencies, jurisdictions) => {
  console.log(`Populate foia requests for username ${username}`);
  return muckrockApi.getFoiaRequests({ username: username })
    .then((foiaRequests) => {
      return foiaRequests.map((foiaRequest) => {
        let agency, jurisdiction;
        agency = agencies.find(agency => agency.id === foiaRequest.agency);
        if (agency) {
          jurisdiction = jurisdictions.find(jurisdiction => jurisdiction.id === agency.jurisdiction);
        } else {
          console.log(`could not find agency for ${foiaRequest.agency}`)
        }
    
        return {
          foiaReq: parseFoiaRequest(foiaRequest),
          agency: parseAgency(agency),
          jurisdiction: parseJurisdiction(jurisdiction),
          meta: { runDate: Date.now() },
        };
      });
    });
};

module.exports = populateFoia;