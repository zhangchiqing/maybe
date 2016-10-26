var Maybe = require('./index');
var assert = require('assert');

// Nothing :: * -> Maybe a
// Just a :: a -> Maybe a
// isMaybe :: Maybe a -> Bool
// isNothing :: Maybe a -> Bool
// isJust :: Maybe a -> Bool
assert(Maybe.isNothing(Maybe.Nothing()));
assert(Maybe.isJust(Maybe.Just(1)));
assert(Maybe.isJust(Maybe.Just(null)));
assert(!Maybe.isNothing(Maybe.Just(1)));
assert(!Maybe.isJust(Maybe.Nothing()));

// isMaybe :: Maybe a -> Bool
assert(Maybe.isMaybe(Maybe.Nothing()));
assert(Maybe.isMaybe(Maybe.Just(1)));
assert(!Maybe.isMaybe(1));

// getValueFromJust :: Maybe a -> a
assert.equal(1, Maybe.getValueFromJust(Maybe.Just(1)));

// fromMaybe :: a -> Maybe a -> a
assert.equal(0, Maybe.fromMaybe(0, Maybe.Nothing()));
assert.equal(2, Maybe.fromMaybe(0, Maybe.Just(2)));

// maybe :: b -> (a -> b) -> Maybe a -> b
assert.equal(0, Maybe.maybe(0, parseInt, Maybe.Nothing()));
assert.equal(3, Maybe.maybe(0, parseInt, Maybe.Just('3')));

// toMaybe :: a? -> Maybe a
assert(Maybe.isNothing(Maybe.toMaybe(null)));
assert(Maybe.isNothing(Maybe.toMaybe(undefined)));
assert.equal(3, Maybe.getValueFromJust(Maybe.toMaybe(3)));

// map :: (a -> b) -> Maybe a -> Maybe b
assert(Maybe.isNothing(Maybe.map(parseInt, Maybe.Nothing())));
assert(Maybe.isJust(Maybe.map(parseInt, Maybe.Just('3'))));
assert.equal(3, Maybe.getValueFromJust(Maybe.map(parseInt, Maybe.Just('3'))));

// safeParseInt :: String -> Maybe Number
var safeParseInt = function(str) {
  var n = parseInt(str, 10);
  return isNaN(n) ? Maybe.Nothing() : Maybe.Just(n);
};

// chain :: (a -> Maybe b) -> Maybe a -> Maybe b
assert(Maybe.isNothing(Maybe.chain(safeParseInt, Maybe.Nothing())));
assert(Maybe.isNothing(Maybe.chain(safeParseInt, Maybe.Just('sdf'))));
assert(Maybe.isJust(Maybe.chain(safeParseInt, Maybe.Just('1'))));
assert.equal(1, Maybe.getValueFromJust(Maybe.chain(safeParseInt, Maybe.Just('1'))));
