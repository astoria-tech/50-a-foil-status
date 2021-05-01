const axios = require('axios');
const { MUCKROCK_BASE_URL, MUCKROCK_PAGE_SIZE } = require('./constants');

axios.defaults.headers['Content-Type'] = 'application/json';
const baseUrl = MUCKROCK_BASE_URL, pageSize = MUCKROCK_PAGE_SIZE;

const get = async (url, params = null) => {
  if (params) {
    console.log(`calling ${url} with ${JSON.stringify(params)}`);
    return axios.get(url, { params: params });
  } else {
    console.log(`calling ${url}`);
    return axios.get(url);
  }
};

const paginateGet = async (url, previousResults = [], params = null) => {
  return get(url, params)
    .then((response) => {
      const results = [...previousResults, ...response.data.results];

      if (!response.data.next) {
        return results;
      }
      else {
        return paginateGet(response.data.next, results);
      }
    });
};

const getFoiaRequests = async ({ jurisdictionId = null, agencyId = null, username = null } = {}) => {
  const params = { 'page_size': pageSize };

  if (jurisdictionId) {
    params.jurisdiction = jurisdictionId;
  }

  if (agencyId) {
    params.agency = agencyId;
  }

  if (username) {
    params.user = username;
  }

  return paginateGet(baseUrl + 'foia', [], params);
};

const getAgencies = async ({ jurisdictionId = null } = {}) => {
  const params = { 'page_size': pageSize };

  if (jurisdictionId) {
    params.jurisdiction = jurisdictionId;
  }

  return paginateGet(baseUrl + 'agency', [], params);
};

const getAgency = async (id) => {
  return get(baseUrl + `agency/${id}`)
    .then((response) => response.data);
};

const getJurisdictions = async ({ parentId } = {}) => {
  const params = { 'page_size': pageSize };

  if (parentId) {
    params.parent = parentId;
  }

  return paginateGet(baseUrl + 'jurisdiction', [], params);
};

const getJurisdiction = async (id) => {
  return get(baseUrl + `jurisdiction/${id}`)
    .then((response) => response.data);
};

module.exports = {
  get: get,
  paginateGet: paginateGet,
  getFoiaRequests: getFoiaRequests,
  getAgencies: getAgencies,
  getAgency: getAgency,
  getJurisdictions: getJurisdictions,
  getJurisdiction: getJurisdiction,
};
