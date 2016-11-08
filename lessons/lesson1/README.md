In this lesson, we have a real world example. We want to implement a function that is going to find the best friend of a given user, and return the username.

We don't need to implement everything from scratch, here are a few functions that are already implemented as a building blocks. Let's take a look at their type signatures.

Type signatures are very useful form to indicate the type of a function's input and output values.

For exampe:

```
parseUserId :: String -> UserId?
```

The above `parseUserId` type signature indicates that it takes a string value and returns an optional UserId value. `UserId?` means it's an optional type, its value could be either a UserId or undefined or null.
So basically we can tell that the `parseUserId` function will take a string value as userId, and return a UserId value if the string can be parsed as UserId, otherwise, it's gonna return null or undefined.

```
findBestFriendshipByUserId :: UserId -> Friendship?
```

For `findBestFriendshipByUserId` function, it takes a UserId value and returns an optional Friendship value, meaning it might or might not be able to find best friend for a certain user.

```
selectFriendId :: Friendship -> UserId
```

selectFriendId is a selector, it takes a Friendship, and returs the friendId of the friendship.

```
findUserById :: UserId -> User?
```

findUserById takes a UserId value and return a user if can be found by the userId, otherwise return null or undefined.

```
selectUserName :: User -> String
```

selectUsername takes a User value, and return the username of that user.

With these functions, we want to implement the findBestFriendshipByUserId with the following signature:

```
// findBestFriendshipByUserId :: String -> String?
var findBestFriendshipByUserId = function(userIdStr) {
};
```

findBestFriendshipByUserId will take userId as string value, and returns the name of the best friend if can be found, other return null or undefined.

Please take this as an exercise, try to implement the `findBestFriendshipByUserId` function with the functions defined above.

So in index.js, I have an implementation in the example which is a very typical imperative style way. The implementation works, I have test cases to cover all the edge cases. So it works as I expected, no bug.

However, there are still some potential problem with this implementation.

### 1. non-determinestic
The value of an optional type when it's empty is non-determinestic. It could be either `null` or `undefined`. In the example, I used two different ways to check if an optional type is empty.
```
  if (userId === null || userId === undefined) {
    ...
  }

  if (!friendship) {
    ...
  }
```

The first one is correct, since an optional value can be either `null` or `undefined`. but it might need to check twice, so the code is long. So sometimes people will just use the second form, which is much shorter. But the second form might bring another problem. If the optional type `UserId?` is implemented as `Number?`, and if the value happens to be `0`, then `!friendship` will be evaluated to `true` when checking if the value is empty! because `0` is falsy in JavasScript. `String?` has the same problem, empty string `!""` will be evaluated to `true` as well.

That's the input value. Let's take a look at the return value. The return value for empty case is also non-determinestic. In the example, there are three `return`s, which are returning the empty value.

```
  if (userId === null || userId === undefined) {
    return ;
  }

  ...

  if (!friendship) {
    return null;
  }

  ...

  if (!friend) {
    return friend;
  }
```
The first one `return ;` will return `undefined`, the second one returns `null`, and the third one we can't tell if it's `undefined` or `null` right away, we have to check the implementation of the function which returns the `friend`.

So the problem of optional type such as `String?` is that the empty value is not a determinted value. It's an union of two values `null` and `undefined`, which will take more statements to check if it's empty. And if there is a bug that was caused by an incomplete check, for instance `!friendship` or `friendship === null`, it will be very hard to find out.

This is the first pain point.

In this lesson we went through a real world example to introduce the use case of optional type and how often do we need them. Then we talked about its first pain point. Next lesson we are going to introduce the second pain point, which is more critial than the first one: The cause to the most common TypeError `cannot find property xxx of undefined`.
