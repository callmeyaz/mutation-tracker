
import { MutationTracker } from "./mutation-tracker";

var user = {
	name: {
		firstname: "John",
		lastname: "Doe"
	},
	address: "123 Happy Street"
}

type Validation = {
	dirty: boolean,
	touched: boolean
}

var tracker = MutationTracker<Validation>(user, {
	initialMutation: {
		mutatedAttributes: [
			"name.firstname"
		],
		mutatedValue: { dirty: true, touched: false }
	},
	defaultValue: { dirty: false, touched: false }
});

console.log(JSON.stringify(tracker.state));
// { name: { firstname: { dirty: true, touched: false }, lastname: { dirty: false, touched: false } }, address: { dirty: false, touched: false }}

tracker.setMutatedByAttributeName({ dirty: true, touched: true }, "name.lastname");

console.log("firstname: ", tracker.getMutatedByAttributeName("name.firstname"));
console.log("lastname: ", tracker.getMutatedByAttributeName("name.lastname"));
console.log("address: ", tracker.getMutatedByAttributeName("address"));

console.log(JSON.stringify(tracker.state));
// { name: { firstname: { dirty: true, touched: false }, lastname: { dirty: true, touched: true } }, address: { dirty: false, touched: false }}

tracker.reset();

console.log(JSON.stringify(tracker.state));
// { name: { firstname: { dirty: true, touched: false }, lastname: { dirty: false, touched: false } }, address: { dirty: false, touched: false }}

tracker.clear();

console.log(JSON.stringify(tracker.state));
// { name: { firstname: { dirty: false, touched: false }, lastname: { dirty: false, touched: false } }, address: { dirty: false, touched: false }}

