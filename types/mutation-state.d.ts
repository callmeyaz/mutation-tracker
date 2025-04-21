export type MutatedAttribute<DType, T> = {
    [Key in keyof DType]?: DType[Key] extends any[] ? (DType[Key][number] extends object ? MutatedAttribute<DType[Key][number], T>[] : T[]) : (DType[Key] extends object ? MutatedAttribute<DType[Key], T> : T);
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
export declare function setMutatedByAttribute<DType, T>(state: MutatedState<DType, T>, value: MutatedAttribute<DType, T>): MutatedState<DType, T>;
/**
 *
 * @param state - Current state object.
 * @param attributePath - Attribute name to be updated with mutation.
 * @returns Mutation for the attribute.
 */
export declare function getMutationByAttributePath<DType, T>(state: MutatedState<DType, T>, attributePath: string): T;
/**
 *
 * @param state - Current state object.
 * @param attribute - Attribute name to be updated with mutation.
 * @param value - Mutation to be merged on state object.
 * @returns - Updated state object.
 */
export declare function setMutatedByAttributePath<DType, T>(state: MutatedState<DType, T>, value: T, attributePath: string): MutatedState<DType, T>;
/**
 *
 * @param state - Current state object.
 * @param value - Mutation to be merged on state object.
 * @param attributePaths - List of attribute names to be updated with mutation.
 * @returns - Updated state object.
 */
export declare function setMutatedByAttributePaths<DType, T>(state: MutatedState<DType, T>, value: T, attributePaths: string[]): MutatedState<DType, T>;
/**
 *
 * @param obj - target object used to create state object.
 * @param value - default value of mutation descriptor.
 * @returns - New state object.
 */
export declare function buildMutationFromObject<DType, T>(obj: DType, value: T): MutatedAttribute<DType, T>;
/**
 *
 * @param state Current state object.
 * @param mutation Mutation to be merged on state object.
 * @returns Updated state object.
 */
export declare function setMutatedAllAttributes<DType, T>(state: MutatedState<DType, T>, value: T): MutatedState<DType, T>;
/**
 *
 * @param state - Current state object.
 * @param mutation - Mutation to be replaced on state object.
 * @returns - Updated state object.
 */
export declare function resetMutatedState<DType, T>(state: MutatedState<DType, T>, mutation: MutatedAttribute<DType, T>): MutatedState<DType, T>;
/**
 *
 * @param state - Current state object.
 * @returns - Updated state object.
 */
export declare function clearMutatedState<DType, T>(state: MutatedState<DType, T>, mutationTemplate: MutatedAttribute<DType, T>): MutatedState<DType, T>;
//# sourceMappingURL=mutation-state.d.ts.map