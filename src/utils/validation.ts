/**
 * Simple runtime validation for Timeline props without external dependencies
 */

interface ValidationError {
  path: string[];
  message: string;
}

function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates timeline props and returns validation errors
 * @param props - Timeline props to validate
 * @returns Array of validation errors (empty if valid)
 */
export function validateTimelineProps(props: any): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate items array
  if (!props.items || !Array.isArray(props.items)) {
    errors.push({ path: ['items'], message: 'Items must be an array' });
  } else if (props.items.length === 0) {
    errors.push({
      path: ['items'],
      message: 'At least one timeline item is required',
    });
  } else {
    // Validate each item
    props.items.forEach((item: any, index: number) => {
      if (item.url && typeof item.url === 'string' && !isValidUrl(item.url)) {
        errors.push({
          path: ['items', index.toString(), 'url'],
          message: 'Invalid URL format',
        });
      }

      if (item.media?.source?.url && !isValidUrl(item.media.source.url)) {
        errors.push({
          path: ['items', index.toString(), 'media', 'source', 'url'],
          message: 'Invalid media URL format',
        });
      }
    });
  }

  // Validate mode
  const validModes = ['VERTICAL', 'HORIZONTAL', 'VERTICAL_ALTERNATING'];
  if (props.mode && !validModes.includes(props.mode)) {
    errors.push({
      path: ['mode'],
      message: `Mode must be one of: ${validModes.join(', ')}`,
    });
  }

  // Validate numeric props
  const numericProps = [
    'cardHeight',
    'cardWidth',
    'itemWidth',
    'lineWidth',
    'slideItemDuration',
    'activeItemIndex',
  ];
  numericProps.forEach((prop) => {
    const value = props[prop];
    if (value !== undefined && (typeof value !== 'number' || value < 0)) {
      errors.push({
        path: [prop],
        message: `${prop} must be a positive number`,
      });
    }
  });

  // Validate theme colors if present
  if (props.theme && typeof props.theme === 'object') {
    const colorProps = [
      'primary',
      'secondary',
      'cardBgColor',
      'cardForeColor',
      'titleColor',
      'titleColorActive',
    ];
    colorProps.forEach((prop) => {
      const color = props.theme[prop];
      if (color && typeof color === 'string' && !isValidHexColor(color)) {
        errors.push({
          path: ['theme', prop],
          message: `${prop} must be a valid hex color (e.g., #ff0000 or #f00)`,
        });
      }
    });
  }

  // Validate boolean props
  const booleanProps = [
    'slideShow',
    'flipLayout',
    'cardLess',
    'hideControls',
    'disableNavOnKey',
  ];
  booleanProps.forEach((prop) => {
    const value = props[prop];
    if (value !== undefined && typeof value !== 'boolean') {
      errors.push({ path: [prop], message: `${prop} must be a boolean` });
    }
  });

  return errors;
}

/**
 * Safely validates props without throwing, returns success/error result
 * @param props - Raw timeline props
 * @returns Success result or error result with validation errors
 */
export function safeValidateTimelineProps(
  props: unknown,
):
  | { success: true; data: any }
  | { success: false; errors: ValidationError[] } {
  const errors = validateTimelineProps(props);

  if (errors.length === 0) {
    return { success: true, data: props };
  } else {
    return { success: false, errors };
  }
}
