var Maybe = require('./index');
var assert = require('assert');

// Nothing & isNothing
// Just & isJust
assert(Maybe.isNothing(Maybe.Nothing()));
assert(Maybe.isJust(Maybe.Just(1)));
assert(Maybe.isJust(Maybe.Just(null)));
assert(!Maybe.isNothing(Maybe.Just(1)));
assert(!Maybe.isJust(Maybe.Nothing()));

// getValueFromJust
assert.equal(1, Maybe.getValueFromJust(Maybe.Just(1)));

// fromMaybe
assert.equal(0, Maybe.fromMaybe(0, Maybe.Nothing()));
assert.equal(2, Maybe.fromMaybe(0, Maybe.Just(2)));

// maybe
assert.equal(0, Maybe.maybe(0, parseInt, Maybe.Nothing()));
assert.equal(3, Maybe.maybe(0, parseInt, Maybe.Just('3')));

// toMaybe
assert(Maybe.isNothing(Maybe.toMaybe(null)));
assert(Maybe.isNothing(Maybe.toMaybe(undefined)));
assert.equal(3, Maybe.getValueFromJust(Maybe.toMaybe(3)));

// map
assert(Maybe.isNothing(Maybe.map(parseInt, Maybe.Nothing())));
assert(Maybe.isJust(Maybe.map(parseInt, Maybe.Just('3'))));
assert.equal(3, Maybe.getValueFromJust(Maybe.map(parseInt, Maybe.Just('3'))));


