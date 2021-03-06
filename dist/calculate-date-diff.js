'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDiffer = getDiffer;
exports.getTimeKeysWithout = getTimeKeysWithout;
var allKeys = exports.allKeys = ['weeks', 'days', 'hrs', 'min', 'sec', 'ms'];

var keyLabels = exports.keyLabels = {
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

var conversions = exports.conversions = {
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

function getDiffer(keys) {
  return function (fromMoment, toMoment) {
    return calculateDateDiff(fromMoment, toMoment, keys);
  };
}

function getTimeKeysWithout(excludeKeys) {
  return allKeys.filter(function (key) {
    return excludeKeys.indexOf(key) === -1;
  });
}