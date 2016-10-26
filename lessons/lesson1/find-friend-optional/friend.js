var users = require('./data').users;
var friendships = require('./data').friendships;
var assert = require('assert');

// parseUserId :: String? -> UserId?
exports.parseUserId = function(userIdStr) {
  assert.equal(typeof userIdStr, 'string');
  var parsed = parseInt(userIdStr, 10);
  return isNaN(parsed) ? null : parsed;
};

// findBestFriendshipByUserId :: UserId -> Friendship?
exports.findBestFriendshipByUserId = function(userId) {
  assert.equal(typeof userId, 'number');
  return friendships[userId];
};

// findUserById :: UserId -> User?
exports.findUserById = function(userId) {
  assert.equal(typeof userId, 'number');
  // User?
  return users[userId];
};

// selectFriendId :: Friendship -> UserId
exports.selectFriendId = function(friendship) {
  assert.equal(typeof friendship, 'object');
  assert(friendship.hasOwnProperty('friendId'));
  return friendship.friendId;
};

// User -> String
exports.selectUserName = function(user) {
  assert.equal(typeof user, 'object');
  assert(user.hasOwnProperty('name'));
  return user.name;
};
