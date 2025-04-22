# mutation-tracker 1.0.22

### Why?
Mutation Tracker is born out of a need to track and manage **dirty** state of properties/attributes
within JavaScript objects. A major use case of Mutation Tracker library is to track the
states of objects that represent HTML Form Field values.

### How?
Mutation Tracker internally maintains a state object, that represents changes that we track
at any time. Once the tracker is initialized (optioanlly) by providing a target data object,
mutation tracker internally creates a mirror structure of the object. Later, when there is a
change that need to be tracked, we record that change through exposed API functions. Newly
added attributed are auto added to the internal state if not tracked earlier.

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
var tracker = MutationTracker(user, { defaultValue: false });

// set name.firstname property as mutated
tracker.setMutatedByAttributeName(true, "name.firstname");

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }
```

### Samples

#### 1 - Initialization for existing object

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, address: false }
```

#### 2 - Initialization for new object

```javascript
var tracker = MutationTracker({}, { defaultValue: false });
console.log(JSON.stringify(tracker.state));
// {}
```

#### 3 - Set mutated to *true* for existing object

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }
```

#### 4 - Set mutated to *true* for new object

```javascript
var tracker = MutationTracker({}, { defaultValue: false });
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true }
```

#### 5 - Set mutated to *true* at initialization

```javascript
var tracker = MutationTracker({}, {
	defaultValue: false, 
	initialMutation: {
		mutatedAttributes: [
			"name.firstname",
			"name.lastname"
		],
		mutatedValue: true
	}
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
var tracker = MutationTracker(user, { defaultValue: false });
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
var tracker = MutationTracker(user, { defaultValue: false });
tracker.setAll(true);
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: true }
```


#### 9 - Reset mutations

```javascript
var tracker = MutationTracker({}, {
	defaultValue: false, 
	initialMutation: {
		mutatedAttributes: [
			"name.firstname"
		],
		mutatedValue: true
	}
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
var tracker = MutationTracker({}, {
	defaultValue: false, 
	initialMutation: {
		mutatedAttributes: [
			"name.firstname"
		],
		mutatedValue: true
	}
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

#### 11 - Using value type **boolean** for mutaiton tracking

```javascript
var tracker = MutationTracker<boolean>(user, { defaultValue: false });
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }
```

#### 12 - Using value type **number** for mutaiton tracking

```javascript
var tracker = MutationTracker<number>(user, { defaultValue: 0 });
tracker.setMutatedByAttributeName(100, "name.firstname");
tracker.setMutatedByAttributeName(200, "name.lastname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: 100, lastname: 200 }, address: 0 }
```

## Documentation

### MutationTracker
| Property/Function  |  Description |
| ------------ | ------------ |
|  MutationTracker<T, Values>(target: Values, config: MutationConfig<T>) | constructor   |
|  MutationTracker.setMutatedByAttributeName() | sets mutation flag for a qualified attribute name  |
| MutationTracker.setMutatedByAttributeNames()  |  sets mutation flag for multiple qualified attribute names  |
| MutationTracker.getMutatedByAttributeName()  |  gets mutation flag for a qualified attribute name  |
| MutationTracker.reset()  |  Sets mutation tracking back to the initialized state such as reapplying initial mutation settings |
| MutationTracker.setAll()  |  Sets mutation for tracked attributes to *true* |
| MutationTracker.clear()  |  For tracking Without *Type*, removes all mutation tracking. For  tracking with a *Type*, sets all mutations to *default value* |
| MutationTracker.initiallyMutatedAttributes  | Returns list of qualified attribute names, initially set as mutated |
| MutationTracker.initiallyMutatedValue  | Returns value set for initially mutated qualified attribute names |
| MutationTracker.state  | Returns object that represents current state of tracked mutations |

### MutationConfig
| Property/Function  |  Description |
| ------------ | ------------ |
|  MutationConfig.initialMutation | configuration for initial mutation  |
|  MutationConfig.initialMutation.mutatedAttributes | list of qualified attribute names, initially set as mutated  |
|  MutationConfig.initialMutation.mutatedValue | value set for initially mutated qualified attribute names  |
|  MutationConfig.defaultValue | Default value set when functions MutationTracker.resetAll() or MutationTracker.clear() are called |

