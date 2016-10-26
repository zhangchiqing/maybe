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
  // Friendship (x)
  var friendship = M.maybe(M.Nothing(), F.findBestFriendshipByUserId, maybeUserId);
  // ^ The above type should be Maybe Friendship, but I made the mistake
  // that thought the type was Friendship
  // UserId
  var userId = F.selectFriendId(friendship);
  // Maybe User
  var maybeFriend = F.findUserById(userId);
  // Maybe String
  var maybeName = M.map(F.selectUserName, maybeFriend);
  return maybeName;
};

assert.deepEqual(findBestFriendNameByUserId('1'), { isNothing: false, value: 'u2' });
// assert.deepEqual(findBestFriendNameByUserId('sdf'), { isNothing: true });
// assert.deepEqual(findBestFriendNameByUserId('10'), { isNothing: true });
// assert.deepEqual(findBestFriendNameByUserId('3'), { isNothing: true });
// assert.deepEqual(findBestFriendNameByUserId('-1'), { isNothing: true });
