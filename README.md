# mutation-tracker 1.0.14

### What?
Mutation Tracker is born out of a need to track and manage **dirty** state of properties within JavaScript objects.

### How?
Mutation Tracker maintains a mirror object, optionally created using the target object, which we need to track for attribute mutations.
Whenever there is a change in one of the attribute in the target object, we can track that change parallely in the mirror object maintained within Mutation Tracker, using easy to use function calls.

### Why?
A major use case of Mutation Tracker library is to track the dirty state of HTML Form Fields.

### Usage?

Consider the HTML below:

In a browser:
```browser
<input type="text" id="firstname" />
<input type="text" id="lastname" />
<textarea id="address"></textarea>
```
The JavaScript object below represents the state of a HTML form above:
```javascript
var user = {
	name: {
		firstname: "John",
		lastname: "Doe"
	},
	address: "123 Main Street"
}
```
To track changes in the object above, we can mark those property changes as follows.

```javascript

import { MutationTracker } from "./mutation-tracker";

// create a new instance of mutation-tracker
var tracker = MutationTracker(user, {});

// set name.firstname property as mutated
tracker.setMutatedByAttributeName(true, "name.firstname");

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }
```

### Samples

#### 1 - Initialization for existing object

```javascript
var tracker = MutationTracker(user, {});
console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, address: false }
```

#### 2 - Initialization for new object

```javascript
var tracker = MutationTracker({}, {});
console.log(JSON.stringify(tracker.state));
// {}
```

#### 3 - Set mutated to *true* for existing object

```javascript
var tracker = MutationTracker(user, {});
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }
```

#### 4 - Set mutated to *true* for new object

```javascript
var tracker = MutationTracker({}, {});
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true }
```

#### 5 - Set mutated to *true* at initialization

```javascript
var tracker = MutationTracker(user, {
	initiallyMutatedAttributes: [
		"name.firstname",
		"name.lastname"
	]
});
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: false }
```

#### 6 - Set multiple mutations

```javascript
var tracker = MutationTracker(user, {});
tracker.setMutatedByAttributeNames(true, [
	"name.firstname",
	"name.lastname"
]);
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: false }
```

#### 7 - get mutation value of attribute

```javascript
var tracker = MutationTracker(user, {});
tracker.setMutatedByAttributeNames(true, [
	"name.firstname",
	"name.lastname"
]);
console.log("firstname: ", tracker.getMutatedByAttributeName("name.firstname"));
console.log("address: ", tracker.getMutatedByAttributeName("address"));
// firstname: true
// address: false
```

#### 8 - Set all mutations

```javascript
var tracker = MutationTracker(user, {});
tracker.setAll(true);
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: true }
```


#### 9 - Reset mutations

```javascript
var tracker = MutationTracker(user, {
	initiallyMutatedAttributes: [
		"name.firstname"
	]
});
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }
tracker.setMutatedByAttributeName(true, "name.lastname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: false }
tracker.reset();
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }
```

#### 10 - Clear mutations

```javascript
var tracker = MutationTracker(user, {
	initiallyMutatedAttributes: [
		"name.firstname"
	]
});
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }

tracker.setMutatedByAttributeName(true, "name.lastname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: false }

tracker.clear();
console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, address: false }
```

## Documentation

| Property/Function  |  Description |
| ------------ | ------------ |
|  MutationTracker() | constructor   |
|  setMutatedByAttributeName() | sets mutation flag for a qualified attribute name  |
| setMutatedByAttributeNames()  |  sets mutation flag for multiple qualified attribute names  |
| getMutatedByAttributeName()  |  gets mutation flag for a qualified attribute name  |
| reset()  |  Sets mutation tracking back to the initialized state such as reapplying initial mutation settings |
| setAll()  |  Sets mutation for tracked attributes to *true* |
| clear()  |  For tracking Without *Type*, removes all mutation tracking. For  tracking with a *Type*, sets all mutations to *false* |
| initiallyMutatedAttributes  | Returns list of qualified attribute names, initially set for mutations |
| state  | Returns object that represents current state of tracked mutations |

