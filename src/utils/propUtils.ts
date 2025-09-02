/**
 * Utility functions for handling optional props and conditional spreading
 */

/**
 * Creates an object with only the defined (non-undefined) properties
 * @param props - Object with potentially undefined values
 * @returns Object with only defined values
 */
export function filterDefinedProps<T extends Record<string, unknown>>(
  props: T,
): Partial<T> {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) {
      (result as Record<string, unknown>)[key] = value;
    }
  }

  return result;
}

/**
 * Creates an object with only the truthy properties
 * @param props - Object with potentially falsy values
 * @returns Object with only truthy values
 */
export function filterTruthyProps<T extends Record<string, unknown>>(
  props: T,
): Partial<T> {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(props)) {
    if (value) {
      (result as Record<string, unknown>)[key] = value;
    }
  }

  return result;
}

/**
 * Conditionally includes props based on conditions
 * @param conditions - Object mapping prop names to their conditions and values
 * @returns Object with conditionally included props
 */
export function conditionalProps<T extends Record<string, unknown>>(
  conditions: Record<string, { condition: boolean; value: unknown }>,
): Partial<T> {
  const result: Partial<T> = {};

  for (const [key, { condition, value }] of Object.entries(conditions)) {
    if (condition) {
      (result as Record<string, unknown>)[key] = value;
    }
  }

  return result;
}

/**
 * More specific utility for the most common pattern in this codebase:
 * Include prop only if value is defined and not null
 */
export function includeIfDefined<T>(
  key: string,
  value: T,
): Record<string, T> | {} {
  return value !== undefined && value !== null ? { [key]: value } : {};
}

/**
 * Include prop only if value is truthy
 */
export function includeIfTruthy<T>(
  key: string,
  value: T,
): Record<string, T> | {} {
  return value ? { [key]: value } : {};
}

/**
 * Batch version for multiple props - most efficient for the timeline use case
 */
export interface PropCondition<T = any> {
  key: string;
  value: T;
  condition?: 'defined' | 'truthy' | boolean;
}

export function buildProps(conditions: PropCondition[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const { key, value, condition = 'defined' } of conditions) {
    let shouldInclude = false;

    if (typeof condition === 'boolean') {
      shouldInclude = condition;
    } else if (condition === 'defined') {
      shouldInclude = value !== undefined && value !== null;
    } else if (condition === 'truthy') {
      shouldInclude = Boolean(value);
    }

    if (shouldInclude) {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Simple object-based approach - most readable and maintainable
 */
export function pickDefined<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  ) as Partial<T>;
}

export function pickTruthy<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => Boolean(value)),
  ) as Partial<T>;
}
