import cloneDeep from "lodash-es/cloneDeep";
import { setAttributeMutated, setAttributeMutatedMultiple, setAllAttributesMuted, getAttributeMutation } from "./mutation";
/**
 *
 * @param state - Current state object.
 * @param mutation - Mutation to be merged on state object.
 * @returns - Updated state object.
 */
export function setMutatedByAttribute(state, value) {
    var ret = Object.assign(Object.assign({}, state), { mutation: value });
    return ret;
}
/**
 *
 * @param state - Current state object.
 * @param attributePath - Attribute name to be updated with mutation.
 * @returns Mutation for the attribute.
 */
export function getMutationByAttributePath(state, attributePath) {
    var ret = getAttributeMutation(state.mutation, attributePath);
    return ret;
}
/**
 *
 * @param state - Current state object.
 * @param attribute - Attribute name to be updated with mutation.
 * @param value - Mutation to be merged on state object.
 * @returns - Updated state object.
 */
export function setMutatedByAttributePath(state, value, attributePath) {
    var ret = Object.assign(Object.assign({}, state), { mutation: setAttributeMutated(state.mutation, value, attributePath) });
    return ret;
}
/**
 *
 * @param state - Current state object.
 * @param value - Mutation to be merged on state object.
 * @param attributePaths - List of attribute names to be updated with mutation.
 * @returns - Updated state object.
 */
export function setMutatedByAttributePaths(state, value, attributePaths) {
    var ret = Object.assign(Object.assign({}, state), { mutation: setAttributeMutatedMultiple(state.mutation, value, ...attributePaths) });
    return ret;
}
/**
 *
 * @param model - target object used to create state object.
 * @param value - default value of mutation descriptor.
 * @returns - New state object.
 */
export function buildMutationFromObject(model, value) {
    var ret = setAllAttributesMuted(model, value);
    return ret;
}
/**
 *
 * @param state Current state object.
 * @param mutation Mutation to be merged on state object.
 * @returns Updated state object.
 */
export function setMutatedAllAttributes(state, value) {
    var ret = { mutation: setAllAttributesMuted(state.mutation, value) };
    return ret;
}
/**
 *
 * @param state - Current state object.
 * @param mutation - Mutation to be replaced on state object.
 * @returns - Updated state object.
 */
export function resetMutatedState(state, mutation) {
    state.mutation = mutation;
    return state;
}
/**
 *
 * @param state - Current state object.
 * @returns - Updated state object.
 */
export function clearMutatedState(state, mutationTemplate) {
    state.mutation = cloneDeep(mutationTemplate);
    return state;
}
//# sourceMappingURL=mutation-state.js.map