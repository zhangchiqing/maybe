var users = require('./data').users;
var friendships = require('./data').friendships;

// parseUserId :: String? -> UserId?
exports.parseUserId = function(userIdStr) {
  var parsed = parseInt(userIdStr, 10);
  return isNaN(parsed) ? null : parsed;
};

// findBestFriendshipByUserId :: UserId -> Friendship?
exports.findBestFriendshipByUserId = function(userId) {
  return friendships[userId];
};

// findUserById :: UserId -> User?
exports.findUserById = function(userId) {
  // User?
  return users[userId];
};

// selectFriendId :: Friendship -> UserId
exports.selectFriendId = function(friendship) {
  return friendship.friendId;
};

// User -> String
exports.selectUserName = function(user) {
  return user.name;
};
