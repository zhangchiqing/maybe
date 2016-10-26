var F = require('./friend');
var assert = require('assert');

// parseUserId :: String -> UserId?
// findBestFriendshipByUserId :: UserId -> Friendship?
// selectFriendId :: Friendship -> UserId
// findUserById :: UserId -> User?
// selectUserName :: User -> String

// findBestFriendNameByUserId :: String -> String?
var findBestFriendNameByUserId = function(userIdStr) {
  // User?
  var userId = F.parseUserId(userIdStr);
  if (userId === null || userId === undefined) {
    return ;
  }

  // Friendship (x)
  var friendship = F.findBestFriendshipByUserId(userId);
  // ^ The above type should be Friendship?, but I made the mistake
  // that thought the type was Friendship
  // if (!friendship) {
  //   return null;
  // }

  // UserId
  var friendId = F.selectFriendId(friendship);

  // User?
  var friend = F.findUserById(friendId);

  if (!friend) {
    return friend;
  }

  return F.selectUserName(friend);
};

assert.deepEqual(findBestFriendNameByUserId('1'), 'u2');
// assert.deepEqual(findBestFriendNameByUserId('sdf'), undefined);
// assert.deepEqual(findBestFriendNameByUserId('10'), null);
// assert.deepEqual(findBestFriendNameByUserId('3'), undefined);
// assert.deepEqual(findBestFriendNameByUserId('-1'), null);
