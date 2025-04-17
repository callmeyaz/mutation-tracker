/**
 *
 * @param obj - state object to be updated.
 * @param key - qualified paths of the attribute.
 * @param def - default value when attribute not found.
 * @param p - index of the attribute currently traversed.
 * @returns - attribute value if found or default value passed as 'def'.
 */
export declare function GetAttribute(obj: any, key: string | string[], def?: any, p?: number): any;
/**
 *
 * @param obj - state object to be updated.
 * @param value - mutation descriptor.
 * @param visited - attributes which are already visited recursively.
 * @param response - updated state object already updated recursively.
 * @returns - updated state object.
 */
export declare function setAllAttributesMuted<T>(obj: any, value: T, visited?: any, response?: any): any;
/**
 *
 * @param obj - state object to be updated.
 * @param value - mutation descriptor.
 * @param paths - qualified paths of the attributes.
 * @returns - updated state object.
 */
export declare function setAttributeMutatedMultiple<T>(obj: any, value: T, ...paths: string[]): any;
/**
 *
 * @param obj - state object to be searched.
 * @param path - qualified paths of the attribute.
 * @returns - value of mutation in state object.
 */
export declare function getAttributeMutation<T>(obj: any, path: string): T;
/**
 *
 * @param obj - state object to be updated.
 * @param value - mutation descriptor.
 * @param path - qualified path of the attribute.
 * @returns - updated state object.
 */
export declare function setAttributeMutated<T>(obj: any, value: T, path: string): any;
//# sourceMappingURL=mutation.d.ts.map