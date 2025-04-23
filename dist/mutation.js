import isArray from "lodash-es/isArray";
import cloneDeep from "lodash-es/cloneDeep";
import isInteger from "lodash-es/isInteger";
import isObject from "lodash-es/isObject";
import toPath from "lodash-es/toPath";
/**
 *
 * @param model - state object to be updated.
 * @param key - qualified paths of the attribute.
 * @param defaultValue - default value when attribute not found.
 * @param index - index of the attribute currently traversed.
 * @returns - attribute value if found or default value passed as 'def'.
 */
export function getAttribute(model, key, defaultValue, index = 0) {
    const path = toPath(key);
    while (model && index < path.length) {
        model = model[path[index++]];
    }
    if (index !== path.length && !model) {
        return defaultValue;
    }
    return model === undefined ? defaultValue : model;
}
/**
 *
 * @param model - state object to be updated.
 * @param value - mutation descriptor.
 * @param processed - attributes which are already visited recursively.
 * @param result - updated state object already updated recursively.
 * @returns - updated state object.
 */
export function setAllAttributesMuted(model, value, processed = new WeakMap(), result = {}) {
    for (let k of Object.keys(model)) {
        const val = model[k];
        if (isObject(val)) {
            if (!processed.get(val)) {
                processed.set(val, true);
                result[k] = Array.isArray(val) ? [] : {};
                setAllAttributesMuted(val, value, processed, result[k]);
            }
        }
        else {
            result[k] = value;
        }
    }
    return result;
}
/**
 *
 * @param model - state object to be updated.
 * @param value - mutation descriptor.
 * @param paths - qualified paths of the attributes.
 * @returns - updated state object.
 */
export function setAttributeMutatedMultiple(model, value, ...paths) {
    paths.forEach((path) => {
        model = setAttributeMutated(model, value, path);
    });
    return model;
}
/**
 *
 * @param model - state object to be searched.
 * @param path - qualified paths of the attribute.
 * @returns - value of mutation in state object.
 */
export function getAttributeMutation(model, path) {
    let copy = cloneDeep(model);
    let currentNode = copy;
    let index = 0;
    let pathList = toPath(path);
    for (; index < pathList.length - 1; index++) {
        const currentPath = pathList[index];
        let currentObj = getAttribute(model, pathList.slice(0, index + 1));
        if (currentObj && (isObject(currentObj) || isArray(currentObj))) {
            currentNode = currentNode[currentPath] = cloneDeep(currentObj);
        }
        else {
            const nextPath = pathList[index + 1];
            currentNode = currentNode[currentPath] =
                isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
        }
    }
    return currentNode[pathList[index]];
}
/**
 *
 * @param model - state object to be updated.
 * @param value - mutation descriptor.
 * @param path - qualified path of the attribute.
 * @returns - updated state object.
 */
export function setAttributeMutated(model, value, path) {
    let copy = cloneDeep(model);
    let currentNode = copy;
    let index = 0;
    let pathList = toPath(path);
    for (; index < pathList.length - 1; index++) {
        const currentPath = pathList[index];
        let currentObj = getAttribute(model, pathList.slice(0, index + 1));
        if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
            currentNode = currentNode[currentPath] = cloneDeep(currentObj);
        }
        else {
            const nextPath = pathList[index + 1];
            currentNode = currentNode[currentPath] =
                isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
        }
    }
    if ((index === 0 ? model : currentNode)[pathList[index]] === value) {
        return model;
    }
    if (value === undefined) {
        delete currentNode[pathList[index]];
    }
    else {
        currentNode[pathList[index]] = value;
    }
    if (index === 0 && value === undefined) {
        delete copy[pathList[index]];
    }
    return copy;
}
//# sourceMappingURL=mutation.js.map