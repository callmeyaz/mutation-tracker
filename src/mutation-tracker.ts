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
  mutatedAttributes?: string[];
  mutatedValue: T;
}

/**
 * * It allows you to set, get, and clear mutations for
 * specific attributes or all attributes in the
 */
export type MutationConfig<T> = {
  initialMutation?: InitialMutation<T>;
  defaultValue: T;
}


export type MutationState<DType, T> = {
  mutation: MutatedAttribute<DType, T>
}

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
function track<DType extends { [field: string]: any }, T>(target: DType, config: MutationConfig<T>): IMutationTracker<DType, T> {
  const _mutationTemplate = buildMutationTemplateFromObject(target, config.defaultValue);
  const _currentState: MutationState<DType, T> = { mutation: _mutationTemplate };
  const _initiallyMutated = config?.initialMutation;

  resetState();

  function clearState(): void {
    const ret = clearMutatedState(_currentState, _mutationTemplate);
    _currentState.mutation = ret.mutation;
  }

  function resetState(): void {
    clearState();
    const attributesNames = _initiallyMutated?.mutatedAttributes || [];
    const value = _initiallyMutated?.mutatedValue;

    if (attributesNames.length > 0 && value) {
      const ret = setMutatedByAttributePaths(_currentState, value, attributesNames);
      _currentState.mutation = ret.mutation;
    }
  }

  function setAllState(value: T): void {
    const ret = setMutatedAllAttributes(_currentState, value);
    _currentState.mutation = ret.mutation;
  }

  function setMutatedByAttributeName(value: T, attributeName: string): void {
    const ret = setMutatedByAttributePath(_currentState, value, attributeName);
    _currentState.mutation = ret.mutation;
  }

  function setMutatedByAttributeNames(value: T, attributeNames: string[]): void {
    const ret = setMutatedByAttributePaths(_currentState, value, attributeNames);
    _currentState.mutation = ret.mutation;
  }

  function getMutatedByAttributeName(attributeName: string): T {
    const ret = getMutationByAttributePath(_currentState, attributeName);
    return ret;
  }

  return {
    get initiallyMutatedAttributes() { return cloneDeep(_initiallyMutated?.mutatedAttributes || []) },
    get initiallyMutatedValue() { return cloneDeep(_initiallyMutated?.mutatedValue || {} as T) },
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