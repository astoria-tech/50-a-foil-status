const write = require('../../fileDatastore/write');
const { AGENCIES_PATH, JURISDICTIONS_PATH } = require("../constants");
const { NYC_JURISDICTION_ID, NY_STATE_JURISDICTION_ID } = require('../constants');
const retrieveMetadata = require('../populateMetadata/retrieveMetadata');

const populateMetadata = async () => {
  console.log('Populating Jurisdiction and Agency datastore...');

  try {
    retrieveMetadata([NY_STATE_JURISDICTION_ID, NYC_JURISDICTION_ID])
      .then((metadata) => {
        write(metadata.agencyData, AGENCIES_PATH);
        write(metadata.jurisdictionData, JURISDICTIONS_PATH);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = populateMetadata;
