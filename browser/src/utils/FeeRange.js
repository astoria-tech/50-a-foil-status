const makeFeeRange = (value, label, minimum, maximum) => {
  return {
    value: value,
    label: label,
    minimum: minimum,
    maximum: maximum, // noninclusive
  };
};

const FeeRanges = {
  NoFee: makeFeeRange("no_fee", "No Fee", 0.00, 0.01),
  UnderHundred: makeFeeRange("under_hundred", "Under $100", 0.01, 100.00),
  HundredToThousand: makeFeeRange("hundred_to_thousand", "$100 to $999", 100.00, 1000.00),
  ThousandToTenThousand: makeFeeRange("thousand_to_ten_thousand", "$1000 to $9999", 1000.00, 10000.00),
  OverTenThousand: makeFeeRange("over_ten_thousand", "Over $10000", 10000.00),
};

const FeeRangeList = [
  FeeRanges.NoFee,
  FeeRanges.UnderHundred,
  FeeRanges.HundredToThousand,
  FeeRanges.ThousandToTenThousand,
  FeeRanges.OverTenThousand,
];

const parse = (fee) => {
  const feeNumber = parseFloat(fee);

  return FeeRangeList.find((range) => {
    return range.maximum ? range.maximum > feeNumber && range.minimum <= feeNumber : range.minimum <= feeNumber;
  });
};

const FeeRange = {
  NoFee: FeeRanges.NoFee,
  UnderHundred: FeeRanges.UnderHundred,
  HundredToThousand: FeeRanges.HundredToThousand,
  ThousandToTenThousand: FeeRanges.ThousandToTenThousand,
  OverTenThousand: FeeRanges.OverTenThousand,
  all: FeeRangeList,
  parse: parse,
};

export { FeeRange };