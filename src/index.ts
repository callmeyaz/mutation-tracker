
import { MutationTracker } from "./mutation-tracker";

var user = {
	name: {
		firstname: "John",
		lastname: "Doe"
	},
	address: "123 Happy Street"
}

var tracker = MutationTracker<number>(user, {
	initialMutation: {
		mutatedAttributes: [
			"name.firstname"
		],
		mutatedValue: 1
	},
	defaultValue: 0
});

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false }

tracker.setMutatedByAttributeName(1, "name.lastname");

console.log("firstname: ", tracker.getMutatedByAttributeName("name.firstname"));
console.log("lastname: ", tracker.getMutatedByAttributeName("name.lastname"));
console.log("address: ", tracker.getMutatedByAttributeName("address"));

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: false }

tracker.reset();
tracker.setAll(1);
tracker.setAll(10);
tracker.setAll(100);
tracker.setAll(1000);

console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, address: false }


