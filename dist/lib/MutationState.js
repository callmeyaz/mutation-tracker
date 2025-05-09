import cloneDeep from "lodash-es/cloneDeep";
import { setAttributeMutated, setAttributeMutatedMultiple, setAllAttributesMuted, getAttributeMutation } from "./Mutation";
/**
 * Retrieves the mutation descriptor for a specific attribute in the object tree.
 * @param state - The current state object.
 * @param attributePath - The path to the attribute (dot-separated string).
 * @returns The mutation value for the specified attribute.
 */
export function getMutationByAttributePath(state, defaultValue, attributePath) {
    return getAttributeMutation(state.mutation, defaultValue, attributePath);
}
/**
 * Updates the mutation descriptor for a specific attribute in the object tree.
 * @param state - The current state object.
 * @param value - The new mutation value to set.
 * @param attribute - The path to the attribute (dot-separated string).
 */
export function setMutatedByAttributePath(state, value, defaultValue, attributePath) {
    state.mutation = setAttributeMutated(state.mutation, value, defaultValue, attributePath);
}
/**
 * Updates the mutation descriptor for multiple attributes in the object tree.
 * @param state - The current state object.
 * @param value - The new mutation value to set.
 * @param attributePaths - An array of paths to the attributes (dot-separated strings).
 */
export function setMutatedByAttributePaths(state, value, defaultValue, attributePaths) {
    state.mutation = setAttributeMutatedMultiple(state.mutation, value, defaultValue, ...attributePaths);
}
/**
 * Creates a mutation descriptor for an object tree based on a given model.
 * @param model - target object used to create state object.
 * @param value - default value of mutation descriptor.
 * @returns - A new mutation descriptor object tree.
 */
export function buildMutationFromObject(model, value) {
    var mutations = setAllAttributesMuted(model || {}, value);
    return mutations;
}
/**
 * Updates the mutation descriptor for all attributes in the object tree.
 * @param state Current state object.
 * @param mutation The new mutation value to set for all attributes.
 */
export function setMutatedAllAttributes(state, value) {
    state.mutation = setAllAttributesMuted(state.mutation, value);
}
/**
 * Clears all mutations in the object tree, resetting it to the initial template.
 * @param state - The current state object.
 * @param mutationTemplate - The initial mutation template to reset to.
 */
export function clearMutatedState(state, mutationTemplate) {
    state.mutation = cloneDeep(mutationTemplate);
}
//# sourceMappingURL=MutationState.js.map