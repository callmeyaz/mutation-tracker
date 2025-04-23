import { MutationTracker } from "./mutation-tracker";

var user = {
  name: {
    firstname: "John",
    lastname: "Doe"
  },
  address: "123 Happy Street"
}

var tracker = MutationTracker<typeof user, boolean>(user, {
  initialMutation: {
    mutatedAttributes: [
      "name.firstname"
    ],
    mutatedValue: true
  },
  defaultValue: false
});

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false}

tracker.setMutatedByAttributeName(true, "name.lastname");

console.log("firstname: ", tracker.getMutatedByAttributeName("name.firstname"));
console.log("lastname: ", tracker.getMutatedByAttributeName("name.lastname"));
console.log("address: ", tracker.getMutatedByAttributeName("address"));

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: true }, address: false}

tracker.reset();

console.log(JSON.stringify(tracker.state));
// { name: { firstname: true, lastname: false }, address: false}

tracker.clear();

console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, false}

var state = tracker.state;
state!.address = true;
console.log(JSON.stringify(state));
console.log(JSON.stringify(tracker.state));
// { name: { firstname: false, lastname: false }, true}