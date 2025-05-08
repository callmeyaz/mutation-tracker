/**
 * This module provides utility functions and types for managing and tracking
 * mutations in a nested object tree. It includes functions to set, retrieve,
 * and clear mutation descriptors for attributes in the object tree.
 */

import cloneDeep from "lodash-es/cloneDeep";
import {
  buildMutationFromObject as buildMutationTemplateFromObject,
  clearMutatedState,
  getMutationByAttributePath,
  MutatedAttribute,
  setMutatedAllAttributes,
  setMutatedByAttributePath,
  setMutatedByAttributePaths
} from "./mutation-state";

/**
 * It allows you to set, get, and clear mutations for 
 * specific attributes or all attributes in the 
 * object tree at the time of initilization.
 */
export type InitialMutation<T> = {
  mutatedAttributes: string[];
  mutatedValue: T;
}

/**
 * It allows you to set, get, and clear mutations for
 * specific attributes or all attributes in the
 */
export type MutationConfig<T> = {
  initialMutation?: InitialMutation<T>;
  defaultValue: T;
}

/**
 * Type of state object which is used to track mutations.
 */
export type MutationState<DType, T> = {
  mutation: MutatedAttribute<DType, T>
}

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
function track<DType extends { [field: string]: any }, T>(
  target: DType,
  config: MutationConfig<T>
): IMutationTracker<DType, T> {
  const _config = config;
  const _mutationTemplate = buildMutationTemplateFromObject(target, _config.defaultValue);
  const _currentState: MutationState<DType, T> = {
    mutation: _mutationTemplate || {}
  };
  const _initiallyMutated = _config.initialMutation || {
    mutatedAttributes: [],
    mutatedValue: _config.defaultValue
  } as InitialMutation<T>;

  resetState();

  function getDefaultValue(): T {
    return cloneDeep(_config.defaultValue);
  }

  function clearState(): void {
    clearMutatedState(_currentState, _mutationTemplate);
  }

  function resetState(): void {
    clearState();
    const attributesNames = _initiallyMutated.mutatedAttributes;
    const value = _initiallyMutated.mutatedValue;

    if (attributesNames.length > 0) {
      setMutatedByAttributePaths(_currentState, value, getDefaultValue(), attributesNames);
    }
  }

  function setAllState(value: T): void {
    setMutatedAllAttributes(_currentState, value);
  }

  function setMutatedByAttributeName(value: T, attributeName: string): void {
    setMutatedByAttributePath(_currentState, value, getDefaultValue(), attributeName);
  }

  function setMutatedByAttributeNames(value: T, attributeNames: string[]): void {
    setMutatedByAttributePaths(_currentState, value, getDefaultValue(), attributeNames);
  }

  function getMutatedByAttributeName(attributeName: string): T {
    return getMutationByAttributePath(_currentState, getDefaultValue(), attributeName);
  }

  return {
    get initiallyMutatedAttributes() { return cloneDeep(_initiallyMutated?.mutatedAttributes) },
    get initiallyMutatedValue() { return cloneDeep(_initiallyMutated?.mutatedValue) },
    get state() { return cloneDeep(_currentState.mutation) },
    clear: clearState,
    reset: resetState,
    setAll: setAllState,
    getMutatedByAttributeName: getMutatedByAttributeName,
    setMutatedByAttributeName: setMutatedByAttributeName,
    setMutatedByAttributeNames: setMutatedByAttributeNames,
  }
}

export const MutationTracker = track;