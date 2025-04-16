/**
 * Get mutation/descriptor on the Attribute
 */
export declare function GetAttribute(obj: any, key: string | string[], def?: any, p?: number): any;
/**
 * Set new mutation/descriptor for the Attribute
 */
export declare function setAllAttributesMuted<T>(object: any, value: T, visited?: any, response?: any): any;
/**
 * Set mutation/descriptor on multiple Attributes at the same time
 */
export declare function setAttributeMutatedMultiple<T>(obj: any, value: T, ...paths: string[]): any;
/**
 * Set mutation/descriptor on an Attribute
 */
export declare function setAttributeMutated<T>(obj: any, value: T, path: string): any;
//# sourceMappingURL=mutation.d.ts.map