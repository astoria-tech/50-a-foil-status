const composeUpdatedDataStore = (updatedFoiaList) => {
  const meta = {
    runDate: Date.now(),
  };

  const newDataStore = {
    meta,
    foiaList: updatedFoiaList,
  };

  return newDataStore;
};

module.exports = composeUpdatedDataStore;
