const { retrieveFoiaRequestsByUsernames } = require("../../../muckrock/foiaRequests");

// TODO: Clean up the error handling on this method
const retrieveFoia = async (username, agencies, jurisdictions) => {
  return retrieveFoiaRequestsByUsernames([username])
    .then((foiaRequests) => {
      return foiaRequests.map((foiaRequest) => {
        let agency, jurisdiction;
        agency = agencies.find(agency => agency.id === foiaRequest.agency);
        if (agency) {
          jurisdiction = jurisdictions.find(jurisdiction => jurisdiction.id === agency.jurisdiction);
          if (!jurisdiction) {
            console.error(`could not find jurisdiction for ${foiaRequest.jurisdiction}`);
            jurisdiction = {
              id: "",
              name: ""
            };
          }
        } else {
          console.error(`could not find agency for ${foiaRequest.agency}`);
          agency = {
            id: foiaRequest.agency,
            name: ""
          };
          jurisdiction = {
            id: "",
            name: ""
          };
        }
    
        return {
          foiaReq: foiaRequest,
          agency: {
            id: agency.id,
            agencyName: agency.name
          },
          jurisdiction: {
            id: jurisdiction.id,
            jurisdictionName: jurisdiction.name
          }
        };
      });
    })
  .then((enrichedFoiaRequests) => {
    return {
      foiaList: enrichedFoiaRequests,
      meta: { runDate: Date.now() }
    };
  });
};

module.exports = retrieveFoia;