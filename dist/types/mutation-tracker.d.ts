/**
 * This module provides utility functions and types for managing and tracking
 * mutations in a nested object tree. It includes functions to set, retrieve,
 * and clear mutation descriptors for attributes in the object tree.
 */
import { MutatedAttribute } from "./MutatedAttribute";
/**
 * It allows you to set, get, and clear mutations for
 * specific attributes or all attributes in the
 * object tree at the time of initilization.
 */
export type InitialMutation<T> = {
    mutatedAttributes: string[];
    mutatedValue: T;
};
/**
 * It allows you to set, get, and clear mutations for
 * specific attributes or all attributes in the
 */
export type MutationConfig<T> = {
    initialMutation?: InitialMutation<T>;
    defaultValue: T;
};
/**
 * Type of state object which is used to track mutations.
 */
export type MutationState<DType, T> = {
    mutation: MutatedAttribute<DType, T>;
};
/**
 * Interface for mutation tracker.
 */
export interface IMutationTracker<DType, T> {
    readonly initiallyMutatedAttributes: string[];
    readonly initiallyMutatedValue: T;
    readonly state: MutatedAttribute<DType, T>;
    clear: () => void;
    reset: () => void;
    setAll: (value: T) => void;
    getMutatedByAttributeName: (attributeName: string) => T;
    setMutatedByAttributeName: (value: T, attributeName: string) => void;
    setMutatedByAttributeNames: (value: T, attributeNames: string[]) => void;
}
/**
 *
 * @param config - Configuration object.
 * @returns - Returns mutation tracker instance.
 */
declare function track<DType extends {
    [field: string]: any;
}, T>(target: DType, config: MutationConfig<T>): IMutationTracker<DType, T>;
export declare const MutationTracker: typeof track;
export {};
//# sourceMappingURL=mutation-tracker.d.ts.map