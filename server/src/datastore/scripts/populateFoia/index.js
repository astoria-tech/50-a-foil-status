const writeOutput = require('../writeOutput');
const { DATASTORE_PATH: dirname } = require("../constants");
const { OFFICER_ACCOUNTABILITY_NY, NYC_JURISDICTION_ID, NY_STATE_JURISDICTION_ID } = require('../constants');
const retrieveFoia = require('./retrieveFoia');
const retrieveMetadata = require('../populateMetadata/retrieveMetadata');

const populateFoia = async () => {
  console.log('Populating FOIA datastore...');

  try {
    retrieveMetadata([NYC_JURISDICTION_ID, NY_STATE_JURISDICTION_ID])
      .then(({agencies, jurisdictions}) => {
        return retrieveFoia(OFFICER_ACCOUNTABILITY_NY, agencies, jurisdictions);
      })
      .then((completeFoiaList) => {
        writeOutput(completeFoiaList, dirname);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = populateFoia;
