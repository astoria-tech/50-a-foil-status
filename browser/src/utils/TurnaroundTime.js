import { DateTime } from "luxon";


const turnaroundShortLabel = (label = "", minimum, maximum) => {
  if (minimum) {
    return maximum ? `${minimum}-${maximum}` : `${minimum}+`;
  } else {
    return label;
  }
};

const makeTurnaroundTime = (value = 0, label = "", minimum = 0, maximum = 0) => {
  return {
    value: value,
    shortLabel: turnaroundShortLabel(label, minimum, maximum),
    label: label,
    minimum: minimum, //measured in days, inclusive
    maximum: maximum, //measured in days, inclusive
  };
};

const TurnaroundTimes = {
  TenDays: makeTurnaroundTime("ten_days", "Within 10 days", 1, 10),
  OneMonth: makeTurnaroundTime("one_month", "10 days to 1 month", 11, 30),
  TwoMonths: makeTurnaroundTime("two_months", "1 to 2 monthes", 31, 60),
  FourMonths: makeTurnaroundTime("four_months", "2 to 4 monthes", 61, 120),
  EightMonths: makeTurnaroundTime("eight_months", "4 to 8 monthes", 121, 240),
  LongerThanEightMonths: makeTurnaroundTime("very_long", "Longer than 8 monthes", 241),
  Outstanding: makeTurnaroundTime("outstanding", "Outstanding"),
}

const TurnaroundTimeList = [
  TurnaroundTimes.TenDays,
  TurnaroundTimes.OneMonth,
  TurnaroundTimes.TwoMonths,
  TurnaroundTimes.FourMonths,
  TurnaroundTimes.EightMonths,
  TurnaroundTimes.LongerThanEightMonths,
  TurnaroundTimes.Outstanding,
];

const parse = (start, end) => {
  if (end) {
    const startDate = DateTime.fromISO(start);
    const endDate = DateTime.fromISO(end);
    const diff = Math.floor(endDate.diff(startDate, "days").toObject().days);

    return TurnaroundTimeList.find((time) => {
      if (time.minimum) {
        return time.maximum ? time.maximum >= diff && time.minimum <= diff : time.minimum <= diff;
      } else return false;
    });
  } else {
    return TurnaroundTimes.Outstanding;
  }
} 

const TurnaroundTime = {
  TenDays: TurnaroundTimes.TenDays,
  OneMonth: TurnaroundTimes.OneMonth,
  TwoMonths: TurnaroundTimes.TwoMonths,
  FourMonths: TurnaroundTimes.FourMonths,
  EightMonths: TurnaroundTimes.EightMonths,
  LongerThanEightMonths: TurnaroundTimes.LongerThanEightMonths,
  Outstanding: TurnaroundTimes.Outstanding,
  all: TurnaroundTimeList,
  parse: parse,
}

export default TurnaroundTime;