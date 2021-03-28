const muckrockApi = require('./api');

const parseFoiaRequest = (foiaRequest = {}) => {
  return {
    id: foiaRequest.id.toString(),
    status: foiaRequest.status,
    datetime_submitted: foiaRequest.datetime_submitted,
    datetime_done: foiaRequest.datetime_done,
    price: foiaRequest.price,
    absolute_url: foiaRequest.absolute_url,
    agency: foiaRequest.agency.toString(),
  };
};

const parseFoiaRequests = (foiaRequests = []) => {
  return foiaRequests.map(parseFoiaRequest);
};

const retrieveFoiaRequestsByUsernames = async (usernames = []) => {
  return Promise.all(usernames.map(username => muckrockApi.getFoiaRequests({ username: username })))
    .then((foiaRequestLists) => foiaRequestLists.reduce((acc, foiaRequests) => [...acc, ...foiaRequests]))
    .then((foiaRequests) => parseFoiaRequests(foiaRequests));
}

module.exports = {
  parseFoiaRequests: parseFoiaRequests,
  retrieveFoiaRequestsByUsernames: retrieveFoiaRequestsByUsernames
};