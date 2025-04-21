import { cloneDeep } from "lodash";
import {
    setAttributeMutated,
    setAttributeMutatedMultiple,
    setAllAttributesMuted,
    getAttributeMutation
} from "./mutation";

/*
* Type of attribute to track mutation descriptor.
* Represents an attribute of the object tree.
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
 * Type of state object to track mutation.
 */
export interface MutatedState<DType, T> {
    mutation: MutatedAttribute<DType, T>;
}

/**
 * 
 * @param state - Current state object.
 * @param mutation - Mutation to be merged on state object. 
 * @returns - Updated state object.
 */
export function setMutatedByAttribute<DType, T>(
    state: MutatedState<DType, T>,
    value: MutatedAttribute<DType, T>)
    : MutatedState<DType, T> {
    var ret = { ...state, mutation: value };
    return ret;
}

/**
 * 
 * @param state - Current state object.
 * @param attributePath - Attribute name to be updated with mutation. 
 * @returns Mutation for the attribute.
 */
export function getMutationByAttributePath<DType, T>(
    state: MutatedState<DType, T>,
    attributePath: string)
    : T {
    var ret = getAttributeMutation<T>(state.mutation, attributePath);
    return ret;
}

/**
 * 
 * @param state - Current state object.
 * @param attribute - Attribute name to be updated with mutation. 
 * @param value - Mutation to be merged on state object. 
 * @returns - Updated state object.
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
 * 
 * @param state - Current state object.
 * @param value - Mutation to be merged on state object.
 * @param attributePaths - List of attribute names to be updated with mutation. 
 * @returns - Updated state object.
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
 * 
 * @param obj - target object used to create state object.
 * @param value - default value of mutation descriptor.
 * @returns - New state object.
 */
export function buildMutationFromObject<DType, T>(
    obj: DType,
    value: T)
    : MutatedAttribute<DType, T> {
    var ret = setAllAttributesMuted(obj, value);
    return ret
}

/**
 * 
 * @param state Current state object.
 * @param mutation Mutation to be merged on state object.
 * @returns Updated state object.
 */
export function setMutatedAllAttributes<DType, T>(
    state: MutatedState<DType, T>,
    value: T)
    : MutatedState<DType, T> {
    var ret = { mutation: setAllAttributesMuted(state.mutation, value) };
    return ret
}

/**
 * 
 * @param state - Current state object.
 * @param mutation - Mutation to be replaced on state object.
 * @returns - Updated state object.
 */
export function resetMutatedState<DType, T>(
    state: MutatedState<DType, T>,
    mutation: MutatedAttribute<DType, T>)
    : MutatedState<DType, T> {
    state.mutation = mutation;
    return state;
}

/**
 * 
 * @param state - Current state object.
 * @returns - Updated state object.
 */
export function clearMutatedState<DType, T>(
    state: MutatedState<DType, T>,
    mutationTemplate: MutatedAttribute<DType, T>)
    : MutatedState<DType, T> {
    state.mutation = cloneDeep(mutationTemplate);
    return state;
}