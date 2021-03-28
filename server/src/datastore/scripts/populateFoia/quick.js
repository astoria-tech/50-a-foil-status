const read = require("../../fileDatastore/read");
const write = require("../../fileDatastore/write");
const { DATASTORE_PATH, REFERENCE_DATA_PATH } = require("../constants");

// TODO: Should we update the metadata so that it writes it to a filename of time.now?
const copyDatastore = async () => {
  const jsonContent = await read(REFERENCE_DATA_PATH);

  await write(jsonContent, DATASTORE_PATH);
};

(async function init() {
  await copyDatastore();
})();
