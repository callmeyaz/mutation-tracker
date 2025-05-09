import { MutatedAttribute } from "./MutatedAttribute";
import { MutatedState } from "./MutatedState";
/**
 * Retrieves the mutation descriptor for a specific attribute in the object tree.
 * @param state - The current state object.
 * @param attributePath - The path to the attribute (dot-separated string).
 * @returns The mutation value for the specified attribute.
 */
export declare function getMutationByAttributePath<DType, T>(state: MutatedState<DType, T>, defaultValue: T, attributePath: string): T;
/**
 * Updates the mutation descriptor for a specific attribute in the object tree.
 * @param state - The current state object.
 * @param value - The new mutation value to set.
 * @param attribute - The path to the attribute (dot-separated string).
 */
export declare function setMutatedByAttributePath<DType, T>(state: MutatedState<DType, T>, value: T, defaultValue: T, attributePath: string): void;
/**
 * Updates the mutation descriptor for multiple attributes in the object tree.
 * @param state - The current state object.
 * @param value - The new mutation value to set.
 * @param attributePaths - An array of paths to the attributes (dot-separated strings).
 */
export declare function setMutatedByAttributePaths<DType, T>(state: MutatedState<DType, T>, value: T, defaultValue: T, attributePaths: string[]): void;
/**
 * Creates a mutation descriptor for an object tree based on a given model.
 * @param model - target object used to create state object.
 * @param value - default value of mutation descriptor.
 * @returns - A new mutation descriptor object tree.
 */
export declare function buildMutationFromObject<DType extends {
    [field: string]: any;
}, T>(model: DType, value: T): MutatedAttribute<DType, T>;
/**
 * Updates the mutation descriptor for all attributes in the object tree.
 * @param state Current state object.
 * @param mutation The new mutation value to set for all attributes.
 */
export declare function setMutatedAllAttributes<DType, T>(state: MutatedState<DType, T>, value: T): void;
/**
 * Clears all mutations in the object tree, resetting it to the initial template.
 * @param state - The current state object.
 * @param mutationTemplate - The initial mutation template to reset to.
 */
export declare function clearMutatedState<DType, T>(state: MutatedState<DType, T>, mutationTemplate: MutatedAttribute<DType, T>): void;
//# sourceMappingURL=mutation-state.d.ts.map