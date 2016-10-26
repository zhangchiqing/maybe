var assert = require('assert');
// String -> User
var makeUser = function(name) {
  assert.equal(typeof name, 'string');
  return { name: name };
};

// a -> Bool
var isUser = function(user) {
  return typeof user === 'object' &&
    user.hasOwnProperty('name');
};

// selectUserName :: User -> String
exports.selectUserName = function(user) {
  assert(isUser(user));
  return user.name;
};

// UserId -> UserId -> Friendship
var makeFriendship = function(userId, friendId) {
  return { userId: userId, friendId: friendId };
};

// a -> Bool
var isFriendship = function(friendship) {
  return typeof friendship === 'object'
    && friendship.hasOwnProperty('userId')
    && friendship.hasOwnProperty('friendId');
};

// selectFriendId :: Friendship -> UserId
exports.selectFriendId = function(friendship) {
  assert(isFriendship(friendship));
  return friendship.friendId;
};

// Map UserId User
exports.users = {
  1: makeUser('u1'),
  2: makeUser('u2'),
  3: makeUser('u3'),
};

// Map UserId Friendship
exports.friendships = {
  1: makeFriendship(1, 2),
  2: makeFriendship(2, 3),
  3: makeFriendship(3, 4),
};
