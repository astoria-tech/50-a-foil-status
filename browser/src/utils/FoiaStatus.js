const makeFoiaStatus = (value, label) => {
  return {
    value: value,
    label: label
  };
};

const FoiaStatuses = {
  Ack: makeFoiaStatus("ack", "Acknowledged"),
  Rejected: makeFoiaStatus("rejected", "Rejected"),
  Done: makeFoiaStatus("done", "Done"),
  Processed: makeFoiaStatus("processed", "Processed"),
  Payment: makeFoiaStatus("payment", "Awaiting Payment"),
  NoDocs: makeFoiaStatus("no_docs", "No Documents Found"),
  Fix: makeFoiaStatus("fix", "Requires Updates"),
  Lawsuit: makeFoiaStatus("lawsuit", "Lawsuit Filed"),
  Abandoned: makeFoiaStatus("abandoned", "Abandoned"),
  Partial: makeFoiaStatus("partial", "Incomplete Request"),
  Appealing: makeFoiaStatus("appealing", "Appealing"),
};

const FoiaStatusList = [
  FoiaStatuses.Ack,
  FoiaStatuses.Rejected,
  FoiaStatuses.Done,
  FoiaStatuses.Processed,
  FoiaStatuses.Payment,
  FoiaStatuses.NoDocs,
  FoiaStatuses.Fix,
  FoiaStatuses.Lawsuit,
  FoiaStatuses.Abandoned,
  FoiaStatuses.Partial,
  FoiaStatuses.Appealing,
  makeFoiaStatus("other", "Other") // This is not present in their dataset, but is used to show any that don't match these criteria
];

const parse = (value) => {
  let converted = FoiaStatusList.find(status => status.value === value);
  if (!converted) {
    converted = makeFoiaStatus("other", value)
  }
  return converted
};

const FoiaStatus = {
  Ack: FoiaStatuses.Ack,
  Rejected: FoiaStatuses.Rejected,
  Done: FoiaStatuses.Done,
  Processed: FoiaStatuses.Processed,
  Payment: FoiaStatuses.Payment,
  NoDocs: FoiaStatuses.NoDocs,
  Fix: FoiaStatuses.Fix,
  Lawsuit: FoiaStatuses.Lawsuit,
  Abandoned: FoiaStatuses.Abandoned,
  Partial: FoiaStatuses.Partial,
  Appealing: FoiaStatuses.Appealing,
  all: FoiaStatusList,
  parse: parse,
};

export { FoiaStatus };