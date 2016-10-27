var assert = require('assert');
var F = require('./friend');
var R = require('ramda');

// parseUserId :: String -> Maybe UserId
// findBestFriendshipByUserId :: UserId -> Maybe Friendship
// selectFriendId :: Friendship -> UserId
// findUserById :: UserId -> Maybe User
// selectUserName :: User -> String

// findBestFriendNameByUserId :: String -> Maybe String
var findBestFriendNameByUserId = R.pipe(
  F.parseUserId, // -> Maybe UserId
  R.chain(F.findBestFriendshipByUserId), // -> Maybe Friendship
  R.map(F.selectFriendId), // -> Maybe UserId
  R.chain(F.findUserById), // -> Maybe User
  R.map(F.selectUserName) // -> Maybe String
);

assert.deepEqual(findBestFriendNameByUserId('1'), { isNothing: false, isJust: true, value: 'u2' });
assert.deepEqual(findBestFriendNameByUserId('sdf'), { isNothing: true, isJust: false });
assert.deepEqual(findBestFriendNameByUserId('10'), { isNothing: true, isJust: false });
assert.deepEqual(findBestFriendNameByUserId('3'), { isNothing: true, isJust: false });
assert.deepEqual(findBestFriendNameByUserId('-1'), { isNothing: true, isJust: false });
