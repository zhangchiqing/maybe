var assert = require('assert');
var F = require('./friend');
var M = require('../../../index');
var R = require('ramda');

// parseUserId :: String -> Maybe UserId
// findBestFriendshipByUserId :: UserId -> Maybe Friendship
// selectFriendId :: Friendship -> UserId
// findUserById :: UserId -> Maybe User
// selectUserName :: User -> String

// findBestFriendNameByUserId :: String -> Maybe String
var findBestFriendNameByUserId = R.pipe(
  F.parseUserId, // -> Maybe UserId
  R.curry(M.chain)(F.findBestFriendshipByUserId), // -> Maybe Friendship
  R.curry(M.map)(F.selectFriendId), // -> Maybe UserId
  R.curry(M.chain)(F.findUserById), // -> Maybe User
  R.curry(M.map)(F.selectUserName) // -> Maybe String
);

assert.deepEqual(findBestFriendNameByUserId('1'), { isNothing: false, value: 'u2' });
// assert.deepEqual(findBestFriendNameByUserId('sdf'), { isNothing: true });
// assert.deepEqual(findBestFriendNameByUserId('10'), { isNothing: true });
// assert.deepEqual(findBestFriendNameByUserId('3'), { isNothing: true });
// assert.deepEqual(findBestFriendNameByUserId('-1'), { isNothing: true });
