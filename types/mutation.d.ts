/**
 *
 * @param model - state object to be updated.
 * @param key - qualified paths of the attribute.
 * @param defaultValue - default value when attribute not found.
 * @param index - index of the attribute currently traversed.
 * @returns - attribute value if found or default value passed as 'def'.
 */
export declare function getAttribute(model: any, key: string | string[], defaultValue?: any, index?: number): any;
/**
 *
 * @param model - state object to be updated.
 * @param value - mutation descriptor.
 * @param processed - attributes which are already visited recursively.
 * @param result - updated state object already updated recursively.
 * @returns - updated state object.
 */
export declare function setAllAttributesMuted<T>(model: any, value: T, processed?: any, result?: any): any;
/**
 *
 * @param model - state object to be updated.
 * @param value - mutation descriptor.
 * @param paths - qualified paths of the attributes.
 * @returns - updated state object.
 */
export declare function setAttributeMutatedMultiple<T>(model: any, value: T, ...paths: string[]): any;
/**
 *
 * @param model - state object to be searched.
 * @param path - qualified paths of the attribute.
 * @returns - value of mutation in state object.
 */
export declare function getAttributeMutation<T>(model: any, path: string): T;
/**
 *
 * @param model - state object to be updated.
 * @param value - mutation descriptor.
 * @param path - qualified path of the attribute.
 * @returns - updated state object.
 */
export declare function setAttributeMutated<T>(model: any, value: T, path: string): any;
//# sourceMappingURL=mutation.d.ts.map