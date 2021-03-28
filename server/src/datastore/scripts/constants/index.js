const path = require("path");

module.exports = {
  DATASTORE_PATH: path.join(__dirname, "../../data"),
  AGENCIES_PATH: path.join(__dirname, "../../agencyData"),
  JURISDICTIONS_PATH: path.join(__dirname, "../../jurisdictionData"),
  REFERENCE_DATA_PATH: path.join(__dirname, "../../referenceData"),
  OFFICER_ACCOUNTABILITY_NY: 'Officer_Accountability_NY',
  NY_STATE_JURISDICTION_ID: '16',
  NYC_JURISDICTION_ID: '17',
};