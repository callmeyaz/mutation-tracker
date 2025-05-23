# mutation-tracker 1.0.36

Mutation-Tracker is built for keeping track of **dirty** state of properties within JSON objects.

Let us suppose, we have a JSON object that mutates multiple times, and we need to track the properties that are changed with every mutation.

This is where the ***mutation-tracker*** library shines.

Mutation-tracker provides a set of APIs to set mutation descriptor to properties that have mutated within JSON objects.

Consider the following example:

```javascript

// sample JSON object
var user = {
	name: {
		firstname: "John",
		lastname: "Doe"
	},
	role: [
		"admin"
	]
	address: "123 Main Street"
}

// initialize tracker using 'boolean' as mutation descriptor type
var tracker = MutationTracker<typeof user, boolean>(user, {
  defaultValue: false
});

// a mirror state is created within mutation-tracker accessed using `state` property:
//	var user = {
//		name: {
//			firstname: false,
//			lastname: false
//		},
//		role: [
//			false
//		],
//		address: false
//	}

// set `name.firstname` property as mutated by setting a boolean descriptor as true.
tracker.setMutatedByAttributeName(true, "name.firstname");

// The updated state within mutation-tracker will now be:
//	var user = {
//		name: {
//			firstname: true,
//			lastname: false
//		},
//		role: [
//			false
//		],
//		address: false
//	}

// the mutation `state` information can be accessed as below:

var mutation = tracker.state.name?.firstname;

console.log("is firstname mutated? ", mutation);

```

check out the npm package **[form-runner](https://www.npmjs.com/package/form-runner)** that uses **[mutation-tracker](https://www.npmjs.com/package/mutation-tracker)** to implement unopinionated front-end form validation library.

### What is Mutation descriptor?
Mutation descriptor is information/tag that is associated to each mutated or non-mutated property.
In previous example, we are using **boolean** type mutation descriptor to track mutation.
We can also use other data types such as number, date, string, etc for mutation descriptor type.


### How to Use Mutation-Tracker?

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

Below are a few example that shows some but not all of the potential uses of mutation-tracker library.

#### 1 - Initialization with an existing object

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, address: false }
```

#### 2 - Initialization with an empty object

```javascript
var tracker = MutationTracker({}, { defaultValue: false });
console.log(JSON.stringify(tracker.state));
// {}
```

#### 3 - Set mutation in an existing object

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }
```

#### 4 - Set mutation in an empty object

```javascript
var tracker = MutationTracker({}, { defaultValue: false });
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true }
```

#### 5 - Set mutation at initialization

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

#### 7 - Check mutation of an attribute

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

#### 8 - Set all attributes as mutated

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
tracker.setAll(true);
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: true }
```


#### 9 - Reset mutations on all attributes

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

#### 10 - Clear mutations on all attributes

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

#### 11 - Add mutation tracking of a new attribute

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

#### 12 - Using **number** mutation descriptor

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

