export const allKeys = [
  'weeks',
  'days',
  'hrs',
  'min',
  'sec',
  'ms'
];

export const keyLabels = {
  weeks: {
    singular: 'week',
    plural: 'weeks'
  },
  days: {
    singular: 'day',
    plural: 'days'
  },
  hrs: {
    singular: 'hr',
    plural: 'hrs'
  },
  min: {
    singular: 'min',
    plural: 'min'
  },
  sec: {
    singular: 'sec',
    plural: 'sec'
  },
  ms: {
    singular: 'ms',
    plural: 'ms'
  }
};

export const conversions = {
  ms: 1,
  sec: 1000,
  min: 60000,
  hrs: 3600000,
  days: 86400000,
  weeks: 604800000
};

function calculateDateDiff(fromMoment, toMoment) {
  var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : allKeys;

  var totalDelta = toMoment.toDate() - fromMoment.toDate();
  var delta = totalDelta;
  var remaining = {};

  if (totalDelta > 0) {
    keys.forEach(function (key) {
      remaining[key] = Math.floor(delta / conversions[key]);
      delta -= remaining[key] * conversions[key];
    });
    remaining.complete = false;
  } else {
    keys.forEach(function (key) {
      remaining[key] = 0;
    });
    remaining.complete = true;
  }
  return remaining;
}

export function getDiffer(keys) {
  return (fromMoment, toMoment) => calculateDateDiff(fromMoment, toMoment, keys);
}

export function getTimeKeysWithout(excludeKeys) {
  return allKeys.filter(key => excludeKeys.indexOf(key) === -1);
}
