'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateDateDiff;
exports.getDiffer = getDiffer;
exports.getTimeKeysWithout = getTimeKeysWithout;
var allKeys = exports.allKeys = ['weeks', 'days', 'hrs', 'min', 'sec', 'ms'];
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
  keys.forEach(function (key) {
    remaining[key] = Math.floor(delta / conversions[key]);
    delta -= remaining[key] * conversions[key];
  });
  remaining.complete = totalDelta === 0;
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