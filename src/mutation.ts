import { cloneDeep, isInteger, isObject, toPath } from "lodash";

/**
 * 
 * @param obj - state object to be updated.
 * @param key - qualified paths of the attribute.
 * @param def - default value when attribute not found.
 * @param p - index of the attribute currently traversed.
 * @returns - attribute value if found or default value passed as 'def'.
 */
export function GetAttribute(
  obj: any,
  key: string | string[],
  def?: any,
  p: number = 0
) {
  const path = toPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }

  if (p !== path.length && !obj) {
    return def;
  }

  return obj === undefined ? def : obj;
}

/**
 * 
 * @param obj - state object to be updated.
 * @param value - mutation descriptor.
 * @param visited - attributes which are already visited recursively.
 * @param response - updated state object already updated recursively.
 * @returns - updated state object.
 */
export function setAllAttributesMuted<T>(
  obj: any,
  value: T,
  visited: any = new WeakMap(),
  response: any = {}
): any {
  for (let k of Object.keys(obj)) {
    const val = obj[k];
    if (isObject(val)) {
      if (!visited.get(val)) {
        visited.set(val, true);
        response[k] = Array.isArray(val) ? [] : {};
        setAllAttributesMuted(val, value, visited, response[k]);
      }
    } else {
      response[k] = value;
    }
  }
  return response;
}

/**
 * 
 * @param obj - state object to be updated.
 * @param value - mutation descriptor.
 * @param paths - qualified paths of the attributes.
 * @returns - updated state object.
 */
export function setAttributeMutatedMultiple<T>(obj: any, value: T, ...paths: string[]): any {
  paths.forEach((path) => {
    obj = setAttributeMutated(obj, value, path);
  });

  return obj;
}

/**
 * 
 * @param obj - state object to be searched.
 * @param path - qualified paths of the attribute.
 * @returns - value of mutation in state object.
 */
export function getAttributeMutation<T>(obj: any, path: string) : T {
  let res: any = cloneDeep(obj);
  let resVal: any = res;
  let i = 0;
  let pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath: string = pathArray[i];
    let currentObj: any = GetAttribute(obj, pathArray.slice(0, i + 1));

    if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
      resVal = resVal[currentPath] = cloneDeep(currentObj);
    } else {
      const nextPath: string = pathArray[i + 1];
      resVal = resVal[currentPath] =
        isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }

  return resVal[pathArray[i]];
}

/**
 * 
 * @param obj - state object to be updated.
 * @param value - mutation descriptor.
 * @param path - qualified path of the attribute.
 * @returns - updated state object.
 */
export function setAttributeMutated<T>(obj: any, value: T, path: string): any {
  let res: any = cloneDeep(obj);
  let resVal: any = res;
  let i = 0;
  let pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath: string = pathArray[i];
    let currentObj: any = GetAttribute(obj, pathArray.slice(0, i + 1));

    if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
      resVal = resVal[currentPath] = cloneDeep(currentObj);
    } else {
      const nextPath: string = pathArray[i + 1];
      resVal = resVal[currentPath] =
        isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }

  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj;
  }

  if (value === undefined) {
    delete resVal[pathArray[i]];
  } else {
    resVal[pathArray[i]] = value;
  }

  if (i === 0 && value === undefined) {
    delete res[pathArray[i]];
  }

  return res;
}
