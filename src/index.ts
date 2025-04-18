
import { MutationTracker } from "./mutation-tracker";

var user = {
	name: {
		firstname: "John",
		lastname: "Doe"
	},
	address: "123 Happy Street"
}

var tracker = MutationTracker(user, {
	initiallyMutatedAttributes: [
		"name.firstname"
	]
});

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }

tracker.setMutatedByAttributeName(true, "name.lastname");

console.log("firstname: ", tracker.getMutatedByAttributeName("name.firstname"));
console.log("lastname: ", tracker.getMutatedByAttributeName("name.lastname"));
console.log("address: ", tracker.getMutatedByAttributeName("address"));

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: false }

tracker.reset();
tracker.setAll(true);
tracker.setAll(true);
tracker.setAll(true);
tracker.setAll(true);

console.log(JSON.stringify(tracker.state));

// { name: { firstname: false, lastname: false }, address: false }