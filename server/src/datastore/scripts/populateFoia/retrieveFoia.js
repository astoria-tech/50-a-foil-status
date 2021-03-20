const { retrieveFoiaRequestsByUsernames } = require("../../../muckrock/foiaRequests");

const retrieveFoia = async (username, agencies, jurisdictions) => {
  return retrieveFoiaRequestsByUsernames([username])
    .then((foiaRequests) => {
      return foiaRequests.map((foiaRequest) => {
        let agency, jurisdiction;
        agency = agencies.find(agency => agency.id === foiaRequest.agency);
        if (agency) {
          jurisdiction = jurisdictions.find(jurisdiction => jurisdiction.id === agency.jurisdiction);
        } else {
          console.error(`could not find agency for ${foiaRequest.agency}`)
        }
    
        return {
          foiaReq: foiaRequest,
          agency: agency,
          jurisdiction: jurisdiction,
          meta: { runDate: Date.now() },
        };
      });
    });
};

module.exports = retrieveFoia;