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
    if (Maybe.isJust(maybeValue)) {
      return Maybe.getValueFromJust(maybeValue);
    } else {
      return defaultValue;
    }
  },
  // b -> (a -> b) -> Maybe a -> b
  maybe: function(defaultNothing, mapJust, maybeValue) {
    if (Maybe.isJust(maybeValue)) {
      return mapJust(Maybe.getValueFromJust(maybeValue));
    } else {
      return defaultNothing;
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
    if (Maybe.isJust(maybeValue)) {
      return Maybe.Just(fn(Maybe.getValueFromJust(maybeValue)));
    } else {
      return maybeValue;
    }
  }
};

module.exports = Maybe;
