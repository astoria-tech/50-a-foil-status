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
    user: foiaRequest.user.toString(),
    communications: parseCommunications(foiaRequest.communications),
  };
};

const parseFoiaRequests = (foiaRequests = []) => {
  return foiaRequests.map(parseFoiaRequest);
};

const parseCommunication = (communication = {}) => {
  return {
    from_user: communication.from_user,
    to_user: communication.to_user,
    datetime: communication.datetime,
    status: communication.status,
    file_stats: parseFileStats(communication.files),
  };
};

const parseCommunications = (communications = []) => {
  return communications.map(parseCommunication);
};

const parseFile = (file = {}) => {
  return {
    id: file.id,
    file_path: file.ffile,
    source: file.source,
    pages: file.pages,
  };
};

// TODO: Make this less ugly, main problem is that set's don't have proper toJson serialization
const parseFileStats = (files = []) => {
  const stats = files.map(parseFile).reduce((acc, file) => {
    return {
      count: acc.count + 1,
      pages: acc.pages + file.pages,
      formats: acc.formats.add(file.file_path.split('.').pop()),
    }
  }, { count: 0, pages: 0, formats: new Set() });

  return stats.count > 0 ? {
    count: stats.count,
    pages: stats.pages,
    formats: Array.from(stats.formats),
  } : null;
};

const retrieveFoiaRequestsByUsernames = async (usernames = []) => {
  return Promise.all(usernames.map(username => muckrockApi.getFoiaRequests({ username: username })))
    .then((foiaRequestLists) => foiaRequestLists.reduce((acc, foiaRequests) => [...acc, ...foiaRequests]))
    .then((foiaRequests) => parseFoiaRequests(foiaRequests));
};

module.exports = {
  parseFoiaRequests: parseFoiaRequests,
  retrieveFoiaRequestsByUsernames: retrieveFoiaRequestsByUsernames
};