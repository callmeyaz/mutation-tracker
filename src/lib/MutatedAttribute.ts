/**
 * Represents a mutation object tree.
 * Each key corresponds to an attribute of the object, and its value
 * represents the mutation state. Nested objects and arrays are recursively
 * represented using the same structure.
 */
export type MutatedAttribute<DType, T> = {
  [Key in keyof DType]
  ?: DType[Key] extends any[]
  ? (DType[Key][number] extends object ? MutatedAttribute<DType[Key][number], T>[] : T[])
  : (DType[Key] extends object ? MutatedAttribute<DType[Key], T> : T);
};
