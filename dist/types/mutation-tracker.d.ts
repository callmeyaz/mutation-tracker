import { MutatedAttribute } from "./mutation-state";
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
export interface IMutationTracker<T, DType> {
    readonly initiallyMutatedAttributes: string[] | undefined;
    readonly initiallyMutatedValue: T | undefined;
    readonly state: MutatedAttribute<DType, T> | undefined;
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
declare function track<T, DType extends {
    [field: string]: any;
}>(target: DType, config: MutationConfig<T>): IMutationTracker<T, DType>;
export declare const MutationTracker: typeof track;
export {};
//# sourceMappingURL=mutation-tracker.d.ts.map