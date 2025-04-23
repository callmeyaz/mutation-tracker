import isArray from "lodash-es/isArray";
import cloneDeep from "lodash-es/cloneDeep";
import { buildMutationFromObject as buildMutationTemplateFromObject, clearMutatedState, getMutationByAttributePath, setMutatedAllAttributes, setMutatedByAttributePath, setMutatedByAttributePaths } from "./mutation-state";
/**
 *
 * @param config - Configuration object.
 * @returns - Returns mutation tracker instance.
 */
function track(target, config) {
    const _mutationTemplate = buildMutationTemplateFromObject(target, config.defaultValue);
    const _currentState = { mutation: _mutationTemplate };
    const _initiallyMutated = config === null || config === void 0 ? void 0 : config.initialMutation;
    resetState();
    function clearState() {
        const ret = clearMutatedState(_currentState, _mutationTemplate);
        _currentState.mutation = ret.mutation;
    }
    function resetState() {
        clearState();
        const attributesNames = _initiallyMutated === null || _initiallyMutated === void 0 ? void 0 : _initiallyMutated.mutatedAttributes;
        const value = _initiallyMutated === null || _initiallyMutated === void 0 ? void 0 : _initiallyMutated.mutatedValue;
        if (attributesNames && value && isArray(attributesNames) && attributesNames.length > 0) {
            const ret = setMutatedByAttributePaths(_currentState, value, attributesNames);
            _currentState.mutation = ret.mutation;
        }
    }
    function setAllState(value) {
        const ret = setMutatedAllAttributes(_currentState, value);
        _currentState.mutation = ret.mutation;
    }
    function setMutatedByAttributeName(value, attributeName) {
        const ret = setMutatedByAttributePath(_currentState, value, attributeName);
        _currentState.mutation = ret.mutation;
    }
    function setMutatedByAttributeNames(value, attributeNames) {
        const ret = setMutatedByAttributePaths(_currentState, value, attributeNames);
        _currentState.mutation = ret.mutation;
    }
    function getMutatedByAttributeName(attributeName) {
        const ret = getMutationByAttributePath(_currentState, attributeName);
        return ret;
    }
    return {
        get initiallyMutatedAttributes() { return cloneDeep((_initiallyMutated === null || _initiallyMutated === void 0 ? void 0 : _initiallyMutated.mutatedAttributes) || []); },
        get initiallyMutatedValue() { return cloneDeep(_initiallyMutated === null || _initiallyMutated === void 0 ? void 0 : _initiallyMutated.mutatedValue); },
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
//# sourceMappingURL=mutation-tracker.js.map