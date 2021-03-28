const write = require('../../fileDatastore/write');
const { DATASTORE_PATH: dirname } = require("../constants");
const { OFFICER_ACCOUNTABILITY_NY } = require('../constants');
const retrieveFoia = require('./retrieveFoia');
const readMetadata = require('./readMetadata');

const populateFoia = async () => {
  console.log('Populating FOIA datastore...');

  try {
    readMetadata()
      .then((metadata) => {
        return retrieveFoia(OFFICER_ACCOUNTABILITY_NY, metadata.agencyData.agencies, metadata.jurisdictionData.jurisdictions);
      })
      .then((completeFoiaList) => {
        write(completeFoiaList, dirname);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = populateFoia;
