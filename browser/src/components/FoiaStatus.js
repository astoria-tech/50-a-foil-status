const FoiaStatus = (value, label) => {
  return {
    value: value,
    label: label
  };
};

const FoiaStatuses = [
  FoiaStatus("ack", "Acknowledged"),
  FoiaStatus("rejected", "Rejected"),
  FoiaStatus("done", "Done"),
  FoiaStatus("processed", "Processed"),
  FoiaStatus("payment", "Awaiting Payment"),
  FoiaStatus("no_docs", "No Documents Found"),
  FoiaStatus("fix", "Requires Updates"),
  FoiaStatus("lawsuit", "Lawsuit Filed"),
  FoiaStatus("abandoned", "Abandoned"),
  FoiaStatus("partial", "Incomplete Request"),
  FoiaStatus("appealing", "Appealing"),
  FoiaStatus("other", "Other"), // This is not present in their dataset, but is used to show any that don"t match these criteria
];

const convertFoiaStatus = (value) => {
  let converted = FoiaStatuses.find(status => status.value === value);
  if (!converted) {
    converted = FoiaStatus("other", value)
  }
  return converted
}

export { FoiaStatuses, convertFoiaStatus };