/**
 * Shallow comparison utility for objects
 */
export function shallowEqual<T extends Record<string, any>>(
  obj1: T | undefined | null,
  obj2: T | undefined | null,
): boolean {
  // Handle null/undefined cases
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}

/**
 * Deep comparison for arrays of simple objects
 */
export function arrayEqual<T>(
  arr1: T[] | undefined | null,
  arr2: T[] | undefined | null,
): boolean {
  if (arr1 === arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    const item1 = arr1[i];
    const item2 = arr2[i];
    
    // For objects with id property, compare by id
    if (typeof item1 === 'object' && item1 !== null && 'id' in item1) {
      if ((item1 as any).id !== (item2 as any).id) return false;
    } else if (item1 !== item2) {
      return false;
    }
  }

  return true;
}

/**
 * Comparison for media objects
 */
export function mediaEqual(
  media1: any | undefined,
  media2: any | undefined,
): boolean {
  if (media1 === media2) return true;
  if (!media1 || !media2) return false;
  
  // Compare relevant media properties
  return (
    media1.source?.url === media2.source?.url &&
    media1.type === media2.type &&
    media1.name === media2.name
  );
}