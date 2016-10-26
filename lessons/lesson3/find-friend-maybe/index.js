var assert = require('assert');
var F = require('./friend');
var M = require('../../../index');

// parseUserId :: String -> Maybe UserId
// findBestFriendshipByUserId :: UserId -> Maybe Friendship
// selectFriendId :: Friendship -> UserId
// findUserById :: UserId -> Maybe User
// selectUserName :: User -> String

// findBestFriendNameByUserId :: String -> Maybe String
var findBestFriendNameByUserId = function(userIdStr) {
  // Maybe UserId
  var maybeUserId = F.parseUserId(userIdStr);
  // Maybe Friendship
  var maybeFriendship = M.maybe(M.Nothing(), F.findBestFriendshipByUserId, maybeUserId);
  // Maybe UserId
  var maybeFriendId = M.map(F.selectFriendId, maybeFriendship);
  // Maybe User
  var maybeFriend = M.maybe(M.Nothing(), F.findUserById, maybeFriendId);
  // Maybe String
  var maybeName = M.map(F.selectUserName, maybeFriend);
  return maybeName;
};

assert.deepEqual(findBestFriendNameByUserId('1'), { isNothing: false, value: 'u2' });
assert.deepEqual(findBestFriendNameByUserId('sdf'), { isNothing: true });
assert.deepEqual(findBestFriendNameByUserId('10'), { isNothing: true });
assert.deepEqual(findBestFriendNameByUserId('3'), { isNothing: true });
assert.deepEqual(findBestFriendNameByUserId('-1'), { isNothing: true });
