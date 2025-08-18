/**
 * Type guards for safer context and data validation
 */

/**
 * Check if a value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard for context validation
 */
export function isValidContext<T>(
  context: T | null | undefined,
  contextName: string = 'Context',
): context is T {
  if (!isDefined(context)) {
    console.error(
      `${contextName} is not available. Ensure the component is wrapped with the appropriate provider.`,
    );
    return false;
  }
  return true;
}

/**
 * Safe context hook wrapper
 */
export function createSafeContextHook<T>(
  useContextHook: () => T | null | undefined,
  contextName: string,
): () => T {
  return () => {
    const context = useContextHook();
    if (!isValidContext(context, contextName)) {
      throw new Error(
        `use${contextName} must be used within a ${contextName}Provider`,
      );
    }
    return context;
  };
}

/**
 * Type guard for checking if an object has a specific property
 */
export function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  key: K,
): obj is T & Record<K, unknown> {
  return key in obj;
}

/**
 * Type guard for checking if a value is a valid enum value
 */
export function isValidEnumValue<T extends Record<string, unknown>>(
  value: unknown,
  enumObject: T,
): value is T[keyof T] {
  return Object.values(enumObject).includes(value);
}

/**
 * Type guard for media objects
 */
export function isValidMedia(media: unknown): media is {
  source?: { url?: string };
  type?: string;
  name?: string;
} {
  if (!media || typeof media !== 'object') return false;

  const m = media as any;
  return (
    (!m.source || typeof m.source === 'object') &&
    (!m.type || typeof m.type === 'string') &&
    (!m.name || typeof m.name === 'string')
  );
}

/**
 * Type guard for timeline items
 */
export function isValidTimelineItem(item: unknown): item is {
  id?: string | number;
  title?: string;
  cardTitle?: string;
  content?: string;
} {
  if (!item || typeof item !== 'object') return false;

  const i = item as any;
  return (
    (!i.id || typeof i.id === 'string' || typeof i.id === 'number') &&
    (!i.title || typeof i.title === 'string') &&
    (!i.cardTitle || typeof i.cardTitle === 'string') &&
    (!i.content || typeof i.content === 'string')
  );
}

/**
 * Safe array access with bounds checking
 */
export function safeArrayAccess<T>(
  array: T[] | undefined | null,
  index: number,
  defaultValue: T | undefined = undefined,
): T | undefined {
  if (!array || index < 0 || index >= array.length) {
    return defaultValue;
  }
  return array[index];
}
