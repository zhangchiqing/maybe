In lesson 1, we used a real world example `findBestFriendNameByUserId` to introduce the use case of optional type and the first pain point. In this lesson, we will talk about the second pain point, which is more critial.

## Pain point 2: cause of the most common Type Error `can not find property xxx of undefined`
In the real world exmple, we had an implementation of `findBestFriendNameByUserId` that is working. It passed all the test cases, which is good. However, we might make mistake, as always :). Sometime we might forget to do the empty check. For example,

```
// findBestFriendshipByUserId :: UserId -> Friendship?
```
The type signature of `findBestFriendshipByUserId` shows it will return an optional type `Friendship?`, but what if we made a mistake and thought it's returning `Friendship`, which is a non-optional type. What will happen? Let's see.

If I thought `findBestFriendshipByUserId` is going to return `Friendship`, which mean it won't return `undefined` or `null`, I wouldn't check if it's empty like this
```
if (!friendship) {
  return null;
}
```

So I commented out the code that does the empty check in this example:

```
  // Friendship (x)
  var friendship = F.findBestFriendshipByUserId(userId);
  // ^ The above type should be Friendship?, but I made the mistake
  // that thought the type was Friendship
  // if (!friendship) {
  //   return null;
  // }
```

Let's run the code and see what's happening.

```
> node lesso2/find-friend-optional/index.js

/Users/leo/zhangchiqing/maybe/lessons/lesson2/find-friend-optional/friend.js:23
  return friendship.friendId;
                   ^
TypeError: Cannot read property 'friendId' of undefined
    at Object.exports.selectFriendId (/Users/leo/zhangchiqing/maybe/lessons/lesson2/find-friend-optional/friend.js:23:20)
    at findBestFriendNameByUserId (/Users/leo/zhangchiqing/maybe/lessons/lesson2/find-friend-optional/index.js:27:20)
    at Object.<anonymous> (/Users/leo/zhangchiqing/maybe/lessons/lesson2/find-friend-optional/index.js:41:18)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
    at startup (node.js:119:16)
    at node.js:945:3

```

Here you go. We just hit one of the most common Type Error in JavasScript: Cannot read property 'xxx' of undefined.

It's good that we caught this Error by a test case, we can fix it before it goes to production. The Error is caught by this test case.
```
assert.deepEqual(findBestFriendNameByUserId('10'), null);
```

But in real world, we might miss this case. For example, if I made the mistake that thought `friendship` wouldn't be empty, and I'm also the one writing test cases for the function, I wouldn't think of writing the case to check if `friendship` is empty, which means I might miss this test case.

Let's see what would happen if I didn't write this test case. I will comment out this test case and run again.

```
// assert.deepEqual(findBestFriendNameByUserId('10'), null);
// assert.deepEqual(findBestFriendNameByUserId('-1'), null);
```

```
> node lesson2/find-friend-optional/index.js

```

Nothing! All the tests are passed, as if everything is correct. But wait, I made a mistake, and the test is showing everything is correct. Then what's gonna happen is that this Error will appear on production! Isn't it risky?

We made a mistake that forgot checking if an optinoal type is empty, and we also missed the last chance to catch it in the testing phase with a test case. But the machine didn't give any warning or error to remind us such mistake. How should we improve then? How to prevent this mistake from happening?

Someone might say we should write more tests. But then it still rely on developer, it relys on developer to think of a case that should be covered by writing test cases. It's risky because anyone might make mistake, and the test case itself might have bug.

If the correctness of a problem relys on developer to think of all the edge cases, it would be very risky and not practical. This real example is a simplified one, one more complex example is like is like this:

```
//  findBestFriendNameByUserIdAndCountry :: (String?, String?) -> String?
var findBestFriendNameByUserIdAndCountry = function(userId, countryId) {
  ...
}
```

We want to find best friend in a given country, and both `userId` and `countryId` could be empty! We would have way more edge cases to cover with test cases.

Isn't it a pain point? The machine can not give us any warning if we had a mistake with optional type, because JavaScript is a weak typed language.

Is there a way to make the machine more smart and find out this kind of mistake for us? Is there something that doesn't require us writing ALL the test cases to be able to find out such mistake?

Yes, the answer is the Maybe pattern! Let's see it in the next lesson.

In this lesson, we introduced the second pain point: The machine can't give us any warning when we are making one of the most common mistake "TypeError: cannot read property "xxx" of undefined". In the next lesson, we are going to introduce the Maybe Pattern, and how it works to solve the pain points.
