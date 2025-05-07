# mutation-tracker 1.0.31

### Why?

Mutation-Tracker tracks **dirty** state of JSON objects so that we can mark changes in the object for delayed synchronization.

Imagine we have a JSON object that undergoes mutation multiple times, and we need to track what properties are changed.

This is where the ***mutation-tracker*** library shines.

Mutation-tracker provides a set of APIs to record mutations for JSON objects using fully qualified name of the object properties.

Below is an example of tracking a change in property having fully qualified name as "name.firstname":

```javascript

var user = {
	name: {
		firstname: "John",
		lastname: "Doe"
	},
	address: "123 Main Street"
}

var tracker = MutationTracker<typeof user, boolean>(user, {
  defaultValue: false
});

// set name.firstname property as mutated by setting a boolean flag to true.
tracker.setMutatedByAttributeName(true, "name.firstname");
```

Above, we are using boolean datatype/descriptor as a flag to track mutation but we can also use other data types as mutation flags.

check out the npm package **[form-runner](https://www.npmjs.com/package/form-runner)** that uses **[mutation-tracker](https://www.npmjs.com/package/mutation-tracker)** to implement unopinionated front-end form validation library.

### How?
Mutation-Tracker internally maintains a mirror state object to track changes.

Once, we initialize a tracker by providing a source JSON object, mutation library internally replicates the structure of the JSON object to create a ***state***. 

With given APIs, we record the mutations by setting the mutation value and full qualified path of the properties which can later be retrieved.

In case a new property is added to the JSON object after initializing the tracker, we can still request to track changes to this property. 

This feature enables support for tracking change in un-typed JSON objects such as **{}**. 


Below is a sample JSON object.

```javascript
var user = {
	name: {
		firstname: "John",
		lastname: "Doe"
	},
	address: "123 Main Street"
}
```
Below is one of the ways to initialize mutation-tracker instance.

```javascript
// Below we are using **boolean** as the mutation descriptor type.
var tracker = MutationTracker<typeof user, boolean>(user, {
  defaultValue: false
});
```
Below is how mutation-tracker library would store the state as:

```javascript
var user = {
	name: {
		firstname: false,
		lastname: false
	},
	address: false
}
```

### Mutation descriptor type?
Mutation descriptor type is the type of mutation information that we need to store with each mutated property. In above exampled we have used a **boolean** type but we can use an type we want as long. As a best pratice keep it as simpler as possible.


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
To track changes in the object above, we can track the property changes as follows:

```javascript

// Import the mutation library reference.
import { MutationTracker } from "./mutation-tracker";

// Create a new instance of mutation-tracker with it's own state.
var tracker = MutationTracker(user, { defaultValue: false });

// set name.firstname property as mutated
tracker.setMutatedByAttributeName(true, "name.firstname");

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }

// Add a new property of type array.
tracker.setMutatedByAttributeName(true, "roles[0]");

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, roles: [ true ], address: false }
```

### Examples

Below are a few example that shows some but not all of the potential of mutation-tracker library.

#### 1 - Initialization with typed object

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, address: false }
```

#### 2 - Initialization with empty object

```javascript
var tracker = MutationTracker({}, { defaultValue: false });
console.log(JSON.stringify(tracker.state));
// {}
```

#### 3 - Set mutation for typed object

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }
```

#### 4 - Set mutation for empty object

```javascript
var tracker = MutationTracker({}, { defaultValue: false });
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true }
```

#### 5 - Set mutation on initialization

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
var tracker = MutationTracker(user, { defaultValue: false });
tracker.setMutatedByAttributeNames(true, [
	"name.firstname",
	"name.lastname"
]);
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: false }
```

#### 7 - Get mutation value of attribute

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

#### 11 - Including new attribute for mutation

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, address: false }

tracker.setMutatedByAttributeName(true, "age");
tracker.setMutatedByAttributeName(true, "role[0]");
tracker.setMutatedByAttributeName(true, "role[1]");

console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, age: true, role [ true, true ], address: false }
```

#### 12 - Using **number** as mutation descriptor

```javascript
var tracker = MutationTracker<number>(user, { defaultValue: 0 });
tracker.setMutatedByAttributeName(100, "name.firstname");
tracker.setMutatedByAttributeName(200, "name.lastname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: 100, lastname: 200 }, address: 0 }
```

## Documentation

### MutationTracker

below is the list of functions and properties available with mutation-tracker.

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
below is the list of properties avaiable on configuration object to initialize mutation-tracker.

| Property/Function  |  Description |
| ------------ | ------------ |
|  MutationConfig.initialMutation | configuration for initial mutation  |
|  MutationConfig.initialMutation.mutatedAttributes | list of qualified attribute names, initially set as mutated  |
|  MutationConfig.initialMutation.mutatedValue | value set for initially mutated qualified attribute names  |
|  MutationConfig.defaultValue | Default value set when functions MutationTracker.resetAll() or MutationTracker.clear() are called |

