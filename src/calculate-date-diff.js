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

export default function calculateDateDiff(fromMoment, toMoment, keys = allKeys) {
  const totalDelta = toMoment.toDate() - fromMoment.toDate();
  let delta = totalDelta;
  const remaining = {};
  keys.forEach(key => {
    remaining[key] = Math.floor(delta / conversions[key]);
    delta -= remaining[key] * conversions[key];
  });
  remaining.complete = totalDelta <= 0;
  return remaining;
}

export function getDiffer(keys) {
  return (fromMoment, toMoment) => calculateDateDiff(fromMoment, toMoment, keys);
}

export function getTimeKeysWithout(excludeKeys) {
  return allKeys.filter(key => excludeKeys.indexOf(key) === -1);
}
