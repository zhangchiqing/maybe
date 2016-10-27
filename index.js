var assert = require('assert');
var Maybe = {
  // * -> Maybe a
  Nothing: function() {
    return { isNothing: true };
  },
  // a -> Maybe a
  Just: function(a) {
    return { isNothing: false, value: a };
  },
  // Maybe a -> Bool
  isMaybe: function(maybe) {
    return typeof maybe === 'object' && maybe.hasOwnProperty('isNothing');
  },
  // Maybe a -> Bool
  isNothing: function(maybe) {
    return maybe.isNothing;
  },
  // Maybe a -> Bool
  isJust: function(maybe) {
    return !Maybe.isNothing(maybe);
  },
  // Maybe a -> a
  getValueFromJust: function(maybeValue) {
    return maybeValue.value;
  },
  // a -> Maybe a -> a
  fromMaybe: function(defaultValue, maybeValue) {
    assert(Maybe.isMaybe(maybeValue));

    if (Maybe.isJust(maybeValue)) {
      return Maybe.getValueFromJust(maybeValue);
    } else {
      return defaultValue;
    }
  },
  // a? -> Maybe a
  toMaybe: function(nullable) {
    if (nullable === null || nullable === undefined) {
      return Maybe.Nothing();
    } else {
      return Maybe.Just(nullable);
    }
  },
  // (a -> b) -> Maybe a -> Maybe b
  map: function(fn, maybeValue) {
    assert(Maybe.isMaybe(maybeValue));

    if (Maybe.isJust(maybeValue)) {
      return Maybe.Just(fn(Maybe.getValueFromJust(maybeValue)));
    } else {
      return maybeValue;
    }
  },
  // b -> (a -> b) -> Maybe a -> b
  maybe: function(defaultNothing, mapJust, maybeValue) {
    assert(Maybe.isMaybe(maybeValue));

    return Maybe.fromMaybe(defaultNothing, Maybe.map(mapJust, maybeValue));
  },
  // (a -> Maybe b) -> Maybe a -> Maybe b
  chain: function(fn, maybeValue) {
    assert(Maybe.isMaybe(maybeValue));

    return Maybe.maybe(Maybe.Nothing(), fn, maybeValue);
  },
};

module.exports = Maybe;
