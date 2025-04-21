import { KeyValuePair, MutatedAttribute } from "./mutation-state";
export type InitialMutation<T> = {
    mutatedAttributes?: string[];
    mutatedValue: T;
};
export type MutationConfig<T> = {
    initialMutation?: InitialMutation<T>;
    defaultValue: T;
};
export type MutationState<DType, T> = {
    mutation: MutatedAttribute<DType, T>;
};
/**
 *
 * @param config - Configuration object.
 * @returns - Returns mutation tracker instance.
 */
declare function track<T, DType extends KeyValuePair>(target: DType, config: MutationConfig<T>): {
    readonly initiallyMutatedAttributes: string[] | undefined;
    readonly initiallyMutatedValue: T | undefined;
    readonly state: MutatedAttribute<DType, T>;
    clear: () => void;
    reset: () => void;
    setAll: (value: T) => void;
    getMutatedByAttributeName: (attributeName: string) => T;
    setMutatedByAttributeName: (value: T, attributeName: string) => void;
    setMutatedByAttributeNames: (value: T, attributeNames: string[]) => void;
};
export declare const MutationTracker: typeof track;
export {};
//# sourceMappingURL=mutation-tracker.d.ts.map