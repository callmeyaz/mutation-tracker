import { expect, test } from "../utils/MicroTester";
import { MutationTracker } from "../src/lib/MutationTracker";

var user = {
  name: {
    firstname: "John",
    lastname: "Doe"
  },
  roles: [
    "reader",
    "writer",
  ],
  address: "123 Happy Street"
}

test('When-Initial-Mutation-Is-Set-Value-Is-Set', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    initialMutation: {
      mutatedAttributes: [
        "name.firstname"
      ],
      mutatedValue: true
    },
    defaultValue: false
  });

  var state = tracker.state;
  expect(state.name?.firstname).toBe(true);
  expect(state.name?.lastname).toBe(false);
  expect(state.address).toBe(false);
});

test('When-Initial-Mutation-Is-Not-Set-Value-Is-Not-Set', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    defaultValue: false
  });

  var state = tracker.state;
  expect(state.name?.firstname).toBe(false);
  expect(state.name?.lastname).toBe(false);
  expect(state.address).toBe(false);
});

test('When-Attribute-Value-Is-Set-Value-Is-Set', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    defaultValue: false
  });

  tracker.setMutatedByAttributeName(true, "address");
  expect(tracker.state.address).toBe(true);
});

test('When-Array-Item-Value-Is-Set-Value-Is-Set', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    defaultValue: false
  });

  tracker.setMutatedByAttributeName(true, "roles[1]");
  expect(tracker.state.roles?.[1]).toBe(true);
});

test('When-Array-Item-Value-Is-Not-Set-Value-Is-Not-Set', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    defaultValue: false
  });

  tracker.setMutatedByAttributeName(true, "roles[1]");
  expect(tracker.state.roles?.[0]).toBe(false);
});


test('When-Attributes-Values-Are-Set-Values-Are-Set', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    defaultValue: false
  });

  tracker.setMutatedByAttributeNames(true, ["roles[0]", "roles[1]"]);
  tracker.setMutatedByAttributeNames(true, ["name.firstname", "name.lastname"]);
  expect(tracker.state.roles?.[0]).toBe(true);
  expect(tracker.state.roles?.[1]).toBe(true);
  expect(tracker.state.name?.firstname).toBe(true);
  expect(tracker.state.name?.lastname).toBe(true);
});

test('When-Reset-Values-Are-Cleared-With-InitialMutation-Set-0', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    defaultValue: false
  });

  tracker.setMutatedByAttributeNames(true, ["roles[0]", "roles[1]"]);
  tracker.setMutatedByAttributeNames(true, ["name.firstname", "name.lastname"]);
  tracker.reset();

  expect(tracker.state.roles?.[0]).toBe(false);
  expect(tracker.state.roles?.[1]).toBe(false);
  expect(tracker.state.name?.firstname).toBe(false);
  expect(tracker.state.name?.lastname).toBe(false);
});

test('When-Reset-Values-Are-Cleared-With-InitialMutation-Set-1', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    initialMutation: {
      mutatedAttributes: [
        "name.firstname"
      ],
      mutatedValue: true
    },
    defaultValue: false
  });

  tracker.setMutatedByAttributeNames(true, ["roles[0]", "roles[1]"]);
  tracker.setMutatedByAttributeNames(true, ["name.firstname", "name.lastname"]);
  tracker.reset();

  expect(tracker.state.roles?.[0]).toBe(false);
  expect(tracker.state.roles?.[1]).toBe(false);
  expect(tracker.state.name?.firstname).toBe(true);
  expect(tracker.state.name?.lastname).toBe(false);
});

test('When-Clear-Values-Are-Cleared-Without-InitialMutation-Set', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    initialMutation: {
      mutatedAttributes: [
        "name.firstname"
      ],
      mutatedValue: true
    },
    defaultValue: false
  });

  tracker.setMutatedByAttributeNames(true, ["roles[0]", "roles[1]"]);
  tracker.setMutatedByAttributeNames(true, ["name.firstname", "name.lastname"]);
  tracker.clear();

  expect(tracker.state.roles?.[0]).toBe(false);
  expect(tracker.state.roles?.[1]).toBe(false);
  expect(tracker.state.name?.firstname).toBe(false);
  expect(tracker.state.name?.lastname).toBe(false);
});


test('When-Set-All-Values-Are-Set', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    initialMutation: {
      mutatedAttributes: [
        "name.firstname"
      ],
      mutatedValue: true
    },
    defaultValue: false
  });

  tracker.setMutatedByAttributeNames(true, ["name.firstname", "name.lastname"]);
  tracker.setAll(true);

  expect(tracker.state.roles?.[0]).toBe(true);
  expect(tracker.state.roles?.[1]).toBe(true);
  expect(tracker.state.name?.firstname).toBe(true);
  expect(tracker.state.name?.lastname).toBe(true);
});


test('When-Set-Returns-Initial-Mutated-Value', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    initialMutation: {
      mutatedAttributes: [
        "name.firstname"
      ],
      mutatedValue: true
    },
    defaultValue: false
  });

  expect(tracker.initiallyMutatedValue).toBe(true);
});

test('When-Set-Returns-Initial-Mutated-Attributes', () => {
  var tracker = MutationTracker<typeof user, boolean>(user, {
    initialMutation: {
      mutatedAttributes: [
        "name.firstname"
      ],
      mutatedValue: true
    },
    defaultValue: false
  });

  expect(tracker.initiallyMutatedAttributes[0]).toBe("name.firstname");
});


test('When-Set-Returns-State', () => {
  var tracker = MutationTracker({}, {
    defaultValue: false
  });

  tracker.setMutatedByAttributeNames(true, ["name.firstname", "name.lastname"]);
  expect(tracker.state["name"].firstname).toBe(true);
  expect(tracker.state["name"].lastname).toBe(true);
  expect(tracker.state["address"]).toBe(undefined);
});