import {
    buildMutationFromObject as buildMutationTemplateFromObject,
    clearMutatedState,
    getMutationByAttributePath,
    KeyValuePair,
    MutatedAttribute,
    setMutatedAllAttributes,
    setMutatedByAttributePath,
    setMutatedByAttributePaths
} from "./mutation-state";
import { isArray } from "lodash";

export type InitialMutation<T> = {
    mutatedAttributes?: string[];
    mutatedValue: T;
}

export type MutationConfig<T> = {
    initialMutation?: InitialMutation<T>;
    defaultValue: T;
}

export type MutationState<Values, T> = {
    mutation: MutatedAttribute<Values, T>
}

/**
 * 
 * @param config - Configuration object.
 * @returns - Returns mutation tracker instance.
 */
function track<T, Values extends KeyValuePair = KeyValuePair>(target: Values, config: MutationConfig<T>) {
    const _mutationTemplate = buildMutationTemplateFromObject(target, config.defaultValue);
    const _currentState: MutationState<Values, T> = { mutation: _mutationTemplate };
    const _initiallyMutated = config?.initialMutation;

    resetState();

    function clearState() {
        const ret = clearMutatedState(_currentState, _mutationTemplate);
        _currentState.mutation = ret.mutation;
    }

    function resetState() {
        clearState();
        const attributesNames = _initiallyMutated?.mutatedAttributes;
        const value = _initiallyMutated?.mutatedValue;

        if (attributesNames && value && isArray(attributesNames) && attributesNames.length > 0) {
            const ret = setMutatedByAttributePaths(_currentState, value, attributesNames);
            _currentState.mutation = ret.mutation;
        }
    }

    function setAllState(value: T) {
        const ret = setMutatedAllAttributes(_currentState, value);
        _currentState.mutation = ret.mutation;
    }

    function setMutatedByAttributeName(value: T, attributeName: string) {
        const ret = setMutatedByAttributePath(_currentState, value, attributeName);
        _currentState.mutation = ret.mutation;
    }

    function setMutatedByAttributeNames(value: T, attributeNames: string[]) {
        const ret = setMutatedByAttributePaths(_currentState, value, attributeNames);
        _currentState.mutation = ret.mutation;
    }

    function getMutatedByAttributeName(attributeName: string) : T {
        const ret = getMutationByAttributePath(_currentState, attributeName);
        return ret;        
    }

    return {
        get initiallyMutatedAttributes() { return _initiallyMutated?.mutatedAttributes },
        get initiallyMutatedValue() { return _initiallyMutated?.mutatedValue },
        get state() { return _currentState.mutation },
        clear: clearState,
        reset: resetState,
        setAll: setAllState,
        getMutatedByAttributeName: getMutatedByAttributeName,
        setMutatedByAttributeName: setMutatedByAttributeName,
        setMutatedByAttributeNames: setMutatedByAttributeNames,
    }
}

export const MutationTracker = track;