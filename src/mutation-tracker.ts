import {
    buildMutationFromObject as buildMutationTemplateFromObject,
    clearMutatedState,
    getMutationByAttributePath,
    KeyValuePair,
    setMutatedAllAttributes,
    setMutatedByAttributePath,
    setMutatedByAttributePaths
} from "./mutation-state";
import { isArray } from "lodash";

export interface MutationConfig {
    initiallyMutatedAttributes?: string[];
}

/**
 * 
 * @param config - Configuration object.
 * @returns - Returns mutation tracker instance.
 */
function track<Values extends KeyValuePair = KeyValuePair>(target: Values, config: MutationConfig) {
    const _mutationTemplate = buildMutationTemplateFromObject(target, false);
    const _currentState = { mutation: _mutationTemplate };
    const _initiallyMutated = config?.initiallyMutatedAttributes || [];

    clearState();

    if (_initiallyMutated && isArray(_initiallyMutated) && _initiallyMutated.length > 0) {
        setMutatedByAttributeNames(true, _initiallyMutated);
    }

    function clearState() {
        var ret = clearMutatedState(_currentState, _mutationTemplate);
        _currentState.mutation = ret.mutation;
    }

    function resetState() {
        clearState();
        var ret = setMutatedByAttributePaths(_currentState, true, _initiallyMutated);
        _currentState.mutation = ret.mutation;
    }

    function setAllState(value: boolean) {
        var ret = setMutatedAllAttributes(_currentState, value);
        _currentState.mutation = ret.mutation;
    }

    function setMutatedByAttributeName(value: boolean, attributeName: string) {
        var ret = setMutatedByAttributePath(_currentState, value, attributeName);
        _currentState.mutation = ret.mutation;
    }

    function setMutatedByAttributeNames(value: boolean, attributeNames: string[]) {
        var ret = setMutatedByAttributePaths(_currentState, value, attributeNames);
        _currentState.mutation = ret.mutation;
    }

    function getMutatedByAttributeName(attributeName: string) : boolean {
        var ret = getMutationByAttributePath(_currentState, attributeName);
        return ret;        
    }

    return {
        get initiallyMutatedAttributes() { return _initiallyMutated },
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