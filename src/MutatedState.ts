import { MutatedAttribute } from "./MutatedAttribute";

/**
 * Represents the state object used to track mutations.
 * Contains a single `mutation` property that holds the mutation object tree.
 */
export interface MutatedState<DType, T> {
  mutation: MutatedAttribute<DType, T>;
}