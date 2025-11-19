# Mutation Tracker 1.0

Mutation-Tracker is a new library to associate metadata to properties within JSON objects within the object tree.

# Why Mutation Tracker?

By associating metadata to properties of JSON objects we can:

* Track changes in the JSON pbjects by marking the changed properties
* Track how many times some properties are changed in a JSON object
* Associate statistics to properties in a JSON.

# Usage

Consider the following example where we have a complex JSON object and for every property in this object we want to associate a flag to represent whether the property value has ever changed or not.

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

```

Below is how we would use mutation-tracker to initialize a tracker instance for our *User* object. The great thing about mutation-tracker is that it can auto generate internal state using the object type provided at the time of initialization.
Also, below we have used *boolean* as type of metadata (mutation-descriptor).

Mutation descriptor is information/tag that is associated to each mutated or non-mutated property.
We can use other data types such as number, date, string, etc for mutation descriptor type.

```javascript

// initialize tracker using 'boolean' as mutation descriptor type
var tracker = MutationTracker<typeof user, boolean>(user, {
  defaultValue: false
});

```

Once a tracker instance is initialized, it internally creates and manages a mirrored state that mimics the structure of the *User* object and looks as below:

```javascript

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

```

Below is how we update the tracker for a change in value of a property "name.firstname": 


```javascript

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

# How to Use Mutation-Tracker For an HTML Form?

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

# Examples

Below are a few example that shows some but not all of the potential uses of mutation-tracker library.

## 1 - Initialization with an existing object

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, address: false }
```

## 2 - Initialization with an empty object

```javascript
var tracker = MutationTracker({}, { defaultValue: false });
console.log(JSON.stringify(tracker.state));
// {}
```

## 3 - Set mutation in an existing object

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }
```

## 4 - Set mutation in an empty object

```javascript
var tracker = MutationTracker({}, { defaultValue: false });
tracker.setMutatedByAttributeName(true, "name.firstname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true }
```

## 5 - Set mutation at initialization

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

## 6 - Set multiple mutations

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
tracker.setMutatedByAttributeNames(true, [
	"name.firstname",
	"name.lastname"
]);
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: false }
```

## 7 - Check mutation of an attribute

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

## 8 - Set all attributes as mutated

```javascript
var tracker = MutationTracker(user, { defaultValue: false });
tracker.setAll(true);
console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: true }
```


## 9 - Reset mutations on all attributes

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

## 10 - Clear mutations on all attributes

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

## 11 - Add mutation tracking of a new attribute

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

## 12 - Using **number** mutation descriptor

```javascript
var tracker = MutationTracker<number>(user, { defaultValue: 0 });
tracker.setMutatedByAttributeName(100, "name.firstname");
tracker.setMutatedByAttributeName(200, "name.lastname");
console.log(JSON.stringify(tracker.state));
// { name: { firstname: 100, lastname: 200 }, address: 0 }
```

# Documentation

## MutationTracker

below is the list of functions and properties available with mutation-tracker.

| Members  | Type |  Description |
| ------------ | ----- | ------------ |
|  MutationTracker<T, Values>(target: Values, config: MutationConfig<T>) | constructor | Create tracker instance   |
|  setMutatedByAttributeName() | function | sets mutation flag for a qualified attribute name  |
| setMutatedByAttributeNames() | function  |  sets mutation flag for multiple qualified attribute names  |
| getMutatedByAttributeName() | function  |  gets mutation flag for a qualified attribute name  |
| reset()  | function |  Sets mutation tracking back to the initialized state such as reapplying initial mutation settings |
| setAll()  | function |  Sets mutation for tracked attributes to *true* |
| clear()  | function |  For tracking Without *Type*, removes all mutation tracking. For  tracking with a *Type*, sets all mutations to *default value* |
| initiallyMutatedAttributes  | readonly property | Returns list of qualified attribute names, initially set as mutated |
| initiallyMutatedValue  | readonly property | Returns value set for initially mutated qualified attribute names |
| state  | readonly property | Returns object that represents current state of tracked mutations |

## MutationConfig
below is the list of properties avaiable on configuration object to initialize mutation-tracker.

| Property/Function  |  Description |
| ------------ | ------------ |
|  initialMutation | configuration for initial mutation  |
|  initialMutation.mutatedAttributes | list of qualified attribute names, initially set as mutated  |
|  initialMutation.mutatedValue | value set for initially mutated qualified attribute names  |
|  defaultValue | Default value set when functions MutationTracker.resetAll() or MutationTracker.clear() are called |

