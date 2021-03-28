const FoiaStatus = (value, label) => {
  return {
    value: value,
    label: label
  };
};

const FoiaStatuses = [
  FoiaStatus("ack", "Awaiting Acknowledgement"),
  FoiaStatus("rejected", "Rejected"),
  FoiaStatus("done", "Done"),
  FoiaStatus("processed", "Awaiting Processing"),
  FoiaStatus("payment", "Awaiting Payment"),
  FoiaStatus("no_docs", "No Documents Found"),
  FoiaStatus("fix", "Requires Updates"),
  FoiaStatus("lawsuit", "Pending Litigation"),
  FoiaStatus("abandoned", "Duplicate Request Abandoned"),
  FoiaStatus("partial", "Partially Completed"),
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