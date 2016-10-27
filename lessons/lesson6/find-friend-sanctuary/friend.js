var S = require('./S');
var users = require('./data').users;
var friendships = require('./data').friendships;
var assert = require('assert');

// parseUserId :: String -> Maybe UserId
exports.parseUserId = function(userIdStr) {
  assert.equal(typeof userIdStr, 'string');
  // UserId?
  var parsed = parseInt(userIdStr, 10);
  return isNaN(parsed) ? S.Nothing() : S.Just(parsed);
};

// findBestFriendshipByUserId :: UserId -> Maybe Friendship
exports.findBestFriendshipByUserId = function(userId) {
  assert.equal(typeof userId, 'number');
  // Friendship?
  var mFriendship = friendships[userId];
  return S.toMaybe(mFriendship);
};

// findUserById :: UserId -> Maybe User
exports.findUserById = function(userId) {
  assert.equal(typeof userId, 'number');
  // User?
  var mUser = users[userId];
  return S.toMaybe(mUser);
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
