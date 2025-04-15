import { cloneDeep } from "lodash";
import {
    setAttributeMutated,
    setAttributeMutatedMultiple,
    setAllAttributesMuted
} from "./mutation";

/*
* Type of Attribute to track mutation/descriptor
* Represents a node of a tree or a leaf of type 'T'
*/

export type MutatedAttribute<Values, T> = {
    [K in keyof Values]
    ?: Values[K] extends any[]
    ? (Values[K][number] extends object ? MutatedAttribute<Values[K][number], T>[] : T)
    : (Values[K] extends object ? MutatedAttribute<Values[K], T> : T);
};

export interface KeyValuePair {
    [field: string]: any;
}

/**
 * Type of state object to track mutation.
 */
export interface MutatedState<Values, T> {
    mutation: MutatedAttribute<Values, T>;
}

/**
 * 
 * @param state Current state object.
 * @param mutation Mutation to be merged on state object. 
 * @returns Newly mutated State object.
 */
export function setMutatedByAttribute<Values, T>(
    state: MutatedState<Values, T>,
    value: MutatedAttribute<Values, T>)
    : MutatedState<Values, T> {
    var ret = { ...state, mutation: value };
    return ret;
}

/**
 * 
 * @param state Current state object.
 * @param attribute Attribute name to be updated with mutation. 
 * @param value Mutation to be merged on state object. 
 * @returns Newly mutated State object.
 */
export function setMutatedByAttributePath<Values, T>(
    state: MutatedState<Values, T>,
    value: T,
    attributePath: string)
    : MutatedState<Values, T> {
    var ret = {
        ...state, mutation: setAttributeMutated(state.mutation, value, attributePath)
    }
    return ret;
}

/**
 * 
 * @param state Current state object.
 * @param value Mutation to be merged on state object.
 * @param attributePaths List of attribute names to be updated with mutation. 
 * @returns Newly mutated State object.
 */
export function setMutatedByAttributePaths<Values, T>(
    state: MutatedState<Values, T>,
    value: T,
    attributePaths: string[])
    : MutatedState<Values, T> {
    var ret = {
        ...state, mutation: setAttributeMutatedMultiple(state.mutation, value, ...attributePaths)
    }
    return ret;
}

export function buildMutationFromObject<Values, T>(
    obj: Values,
    value: T)
    : MutatedAttribute<Values, T> {
    var ret = setAllAttributesMuted(obj, value);
    return ret
}

/**
 * 
 * @param state Current state object.
 * @param mutation Mutation to be merged on state object.
 * @returns Newly mutated State object.
 */
export function setMutatedAllAttributes<Values, T>(
    state: MutatedState<Values, T>,
    value: T)
    : MutatedState<Values, T> {
    var ret = { mutation: setAllAttributesMuted(state, value) };
    return ret
}

/**
 * 
 * @param state Current state object.
 * @param mutation Mutation to be replaced on state object.
 * @returns  Newly mutated State object.
 */
export function ResetMutatedState<Values, T>(
    state: MutatedState<Values, T>,
    mutation: MutatedAttribute<Values, T>)
    : MutatedState<Values, T> {
    state.mutation = mutation;
    return state;
}

/**
 * 
 * @param state Current state object.
 * @returns  Newly mutated State object.
 */
export function ClearMutatedState<Values, T>(
    state: MutatedState<Values, T>,
    initialMutation: MutatedAttribute<Values, T>)
    : MutatedState<Values, T> {
    state.mutation = cloneDeep(initialMutation);
    return state;
}