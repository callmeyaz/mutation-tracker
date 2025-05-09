/**
 * This module provides utility functions and types for managing and tracking
 * mutations in a nested object tree. It includes functions to set, retrieve,
 * and clear mutation descriptors for attributes in the object tree.
 */
import cloneDeep from "lodash-es/cloneDeep";
import { buildMutationFromObject as buildMutationTemplateFromObject, clearMutatedState, getMutationByAttributePath, setMutatedAllAttributes, setMutatedByAttributePath, setMutatedByAttributePaths } from "./MutationState";
/**
 *
 * @param config - Configuration object.
 * @returns - Returns mutation tracker instance.
 */
function track(target, config) {
    const _config = config;
    const _mutationTemplate = buildMutationTemplateFromObject(target, _config.defaultValue);
    const _currentState = {
        mutation: _mutationTemplate || {}
    };
    const _initiallyMutated = _config.initialMutation || {
        mutatedAttributes: [],
        mutatedValue: _config.defaultValue
    };
    resetState();
    function getDefaultValue() {
        return cloneDeep(_config.defaultValue);
    }
    function clearState() {
        clearMutatedState(_currentState, _mutationTemplate);
    }
    function resetState() {
        clearState();
        const attributesNames = _initiallyMutated.mutatedAttributes;
        const value = _initiallyMutated.mutatedValue;
        if (attributesNames.length > 0) {
            setMutatedByAttributePaths(_currentState, value, getDefaultValue(), attributesNames);
        }
    }
    function setAllState(value) {
        setMutatedAllAttributes(_currentState, value);
    }
    function setMutatedByAttributeName(value, attributeName) {
        setMutatedByAttributePath(_currentState, value, getDefaultValue(), attributeName);
    }
    function setMutatedByAttributeNames(value, attributeNames) {
        setMutatedByAttributePaths(_currentState, value, getDefaultValue(), attributeNames);
    }
    function getMutatedByAttributeName(attributeName) {
        return getMutationByAttributePath(_currentState, getDefaultValue(), attributeName);
    }
    return {
        get initiallyMutatedAttributes() { return cloneDeep(_initiallyMutated?.mutatedAttributes); },
        get initiallyMutatedValue() { return cloneDeep(_initiallyMutated?.mutatedValue); },
        get state() { return cloneDeep(_currentState.mutation); },
        clear: clearState,
        reset: resetState,
        setAll: setAllState,
        getMutatedByAttributeName: getMutatedByAttributeName,
        setMutatedByAttributeName: setMutatedByAttributeName,
        setMutatedByAttributeNames: setMutatedByAttributeNames,
    };
}
export const MutationTracker = track;
//# sourceMappingURL=MutationTracker.js.map