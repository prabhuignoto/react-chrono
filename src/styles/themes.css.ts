/**
 * @deprecated This file is deprecated. Use themes from '@/styles/tokens/themes.css' instead.
 *
 * This legacy theme file is maintained for backward compatibility only.
 * All theme implementations have been moved to the unified token system.
 *
 * Migration guide:
 * - Old: `import { lightThemeClass, darkThemeClass } from '@/styles/themes.css'`
 * - New: `import { lightTheme, darkTheme } from '@/styles/tokens/themes.css'`
 */

import { lightTheme, darkTheme } from './tokens/themes.css';

// Re-export for backward compatibility
export const lightThemeClass = lightTheme;
export const darkThemeClass = darkTheme;
