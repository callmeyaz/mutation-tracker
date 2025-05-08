import cloneDeep from "lodash-es/cloneDeep";
import {
  setAttributeMutated,
  setAttributeMutatedMultiple,
  setAllAttributesMuted,
  getAttributeMutation
} from "./mutation";

/**
 * Represents a mutation object tree.
 * Each key corresponds to an attribute of the object, and its value
 * represents the mutation state. Nested objects and arrays are recursively
 * represented using the same structure.
 */
export type MutatedAttribute<DType, T> = {
  [Key in keyof DType]
  ?: DType[Key] extends any[]
  ? (DType[Key][number] extends object ? MutatedAttribute<DType[Key][number], T>[] : T[])
  : (DType[Key] extends object ? MutatedAttribute<DType[Key], T> : T);
};

export interface KeyValuePair {
  [field: string]: any;
}

/**
 * Represents the state object used to track mutations.
 * Contains a single `mutation` property that holds the mutation object tree.
 */
export interface MutatedState<DType, T> {
  mutation: MutatedAttribute<DType, T>;
}

/**
 * Updates the mutation descriptor for an attribute in object tree.
 * @param state - The current state object.
 * @param mutation - The new mutation descriptor to set.
 * @returns - A new state object with the updated mutation descriptor.
 */
export function setMutatedByAttribute<DType, T>(
  state: MutatedState<DType, T>,
  value: MutatedAttribute<DType, T>)
  : MutatedState<DType, T> {
  var ret = { ...state, mutation: value };
  return ret;
}

/**
 * Retrieves the mutation descriptor for a specific attribute in the object tree.
 * @param state - The current state object.
 * @param attributePath - The path to the attribute (dot-separated string).
 * @returns The mutation value for the specified attribute.
 */
export function getMutationByAttributePath<DType, T>(
  state: MutatedState<DType, T>,
  attributePath: string)
  : T {
  var ret = getAttributeMutation<T>(state.mutation, attributePath);
  return ret;
}

/**
 * Updates the mutation descriptor for a specific attribute in the object tree.
 * @param state - The current state object.
 * @param value - The new mutation value to set.
 * @param attribute - The path to the attribute (dot-separated string).
 * @returns - A new state object with the updated mutation descriptor.
 */
export function setMutatedByAttributePath<DType, T>(
  state: MutatedState<DType, T>,
  value: T,
  attributePath: string)
  : MutatedState<DType, T> {
  var ret = {
    ...state, mutation: setAttributeMutated(state.mutation, value, attributePath)
  }
  return ret;
}

/**
 * Updates the mutation descriptor for multiple attributes in the object tree.
 * @param state - The current state object.
 * @param value - The new mutation value to set.
 * @param attributePaths - An array of paths to the attributes (dot-separated strings).
 * @returns - A new state object with the updated mutation descriptors.
 */
export function setMutatedByAttributePaths<DType, T>(
  state: MutatedState<DType, T>,
  value: T,
  attributePaths: string[])
  : MutatedState<DType, T> {
  var ret = {
    ...state, mutation: setAttributeMutatedMultiple(state.mutation, value, ...attributePaths)
  }
  return ret;
}

/**
 * Creates a mutation descriptor for an object tree based on a given model.
 * @param model - target object used to create state object.
 * @param value - default value of mutation descriptor.
 * @returns - A new mutation descriptor object tree.
 */
export function buildMutationFromObject<DType extends { [field: string]: any }, T>(
  model: DType,
  value: T)
  : MutatedAttribute<DType, T> {
  var ret = setAllAttributesMuted(model || {}, value);
  return ret
}

/**
 * Updates the mutation descriptor for all attributes in the object tree.
 * @param state Current state object.
 * @param mutation The new mutation value to set for all attributes.
 * @returns A new state object with the updated mutation descriptor.
 */
export function setMutatedAllAttributes<DType, T>(
  state: MutatedState<DType, T>,
  value: T)
  : MutatedState<DType, T> {
  var ret = { mutation: setAllAttributesMuted(state.mutation, value) };
  return ret
}

/**
 * Clears all mutations in the object tree, resetting it to the initial template.
 * @param state - The current state object.
 * @param mutationTemplate - The initial mutation template to reset to.
 * @returns - A new state object with cleared mutations.
 */
export function clearMutatedState<DType, T>(
  state: MutatedState<DType, T>,
  mutationTemplate: MutatedAttribute<DType, T>)
  : MutatedState<DType, T> {
  var ret = { mutation: cloneDeep(mutationTemplate) };
  return ret;
}