const muckrockApi = require('./muckrockApi');
const populateFoia = require('./populateFoia');
const populateMetadata = require('./populateMetadata');
const writeOutput = require('../writeOutput');
const { OFFICER_ACCOUNTABILITY_NY, NYC_JURISDICTION_ID, NY_STATE_JURISDICTION_ID } = require('../constants');

const createDatastore = async () => {
  console.log('Creating datastore...');

  try {
    populateMetadata([NY_STATE_JURISDICTION_ID, NYC_JURISDICTION_ID])
    .then(({agencies, jurisdictions}) => {
      return populateFoia(OFFICER_ACCOUNTABILITY_NY, agencies, jurisdictions);
    })
    .then((completeFoiaList) => {
      writeOutput(completeFoiaList);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = createDatastore;
