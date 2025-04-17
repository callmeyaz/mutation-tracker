import { KeyValuePair } from "./mutation-state";
export interface MutationConfig {
    initiallyMutatedAttributes?: string[];
}
/**
 *
 * @param config - Configuration object.
 * @returns - Returns mutation tracker instance.
 */
declare function track<Values extends KeyValuePair = KeyValuePair>(target: Values, config: MutationConfig): {
    readonly initiallyMutatedAttributes: string[];
    readonly state: import("./mutation-state").MutatedAttribute<Values, boolean>;
    clear: () => void;
    reset: () => void;
    setAll: (value: boolean) => void;
    getMutationByAttributeName: (attributeName: string) => boolean;
    setMutatedByAttributeName: (value: boolean, attributeName: string) => void;
    setMutatedByAttributeNames: (value: boolean, attributeNames: string[]) => void;
};
export declare const MutationTracker: typeof track;
export {};
//# sourceMappingURL=mutation-tracker.d.ts.map