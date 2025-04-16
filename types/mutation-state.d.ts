export type MutatedAttribute<Values, T> = {
    [K in keyof Values]?: Values[K] extends any[] ? (Values[K][number] extends object ? MutatedAttribute<Values[K][number], T>[] : T) : (Values[K] extends object ? MutatedAttribute<Values[K], T> : T);
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
 * @param state - Current state object.
 * @param mutation - Mutation to be merged on state object.
 * @returns - Updated state object.
 */
export declare function setMutatedByAttribute<Values, T>(state: MutatedState<Values, T>, value: MutatedAttribute<Values, T>): MutatedState<Values, T>;
/**
 *
 * @param state - Current state object.
 * @param attribute - Attribute name to be updated with mutation.
 * @param value - Mutation to be merged on state object.
 * @returns - Updated state object.
 */
export declare function setMutatedByAttributePath<Values, T>(state: MutatedState<Values, T>, value: T, attributePath: string): MutatedState<Values, T>;
/**
 *
 * @param state - Current state object.
 * @param value - Mutation to be merged on state object.
 * @param attributePaths - List of attribute names to be updated with mutation.
 * @returns - Updated state object.
 */
export declare function setMutatedByAttributePaths<Values, T>(state: MutatedState<Values, T>, value: T, attributePaths: string[]): MutatedState<Values, T>;
/**
 *
 * @param obj - target object used to create state object.
 * @param value - default value of mutation descriptor.
 * @returns - New state object.
 */
export declare function buildMutationFromObject<Values, T>(obj: Values, value: T): MutatedAttribute<Values, T>;
/**
 *
 * @param state Current state object.
 * @param mutation Mutation to be merged on state object.
 * @returns Updated state object.
 */
export declare function setMutatedAllAttributes<Values, T>(state: MutatedState<Values, T>, value: T): MutatedState<Values, T>;
/**
 *
 * @param state - Current state object.
 * @param mutation - Mutation to be replaced on state object.
 * @returns - Updated state object.
 */
export declare function ResetMutatedState<Values, T>(state: MutatedState<Values, T>, mutation: MutatedAttribute<Values, T>): MutatedState<Values, T>;
/**
 *
 * @param state - Current state object.
 * @returns - Updated state object.
 */
export declare function ClearMutatedState<Values, T>(state: MutatedState<Values, T>, initialMutation: MutatedAttribute<Values, T>): MutatedState<Values, T>;
//# sourceMappingURL=mutation-state.d.ts.map