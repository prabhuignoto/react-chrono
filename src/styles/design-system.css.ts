/**
 * @deprecated This file is deprecated. Use `tokens` from '@/styles/tokens/index.css' instead.
 *
 * This design system token contract is maintained for backward compatibility only.
 * It has been superseded by the unified token system in `tokens/index.css`.
 *
 * Migration guide:
 * - Old: `import { designTokens } from '@/styles/design-system.css'`
 * - New: `import { tokens } from '@/styles/tokens/index.css'`
 *
 * Token mapping:
 * - `designTokens.color` → `tokens.semantic.color`
 * - `designTokens.spacing` → `tokens.semantic.spacing`
 * - `designTokens.typography` → `tokens.semantic.typography`
 * - `designTokens.radius` → `tokens.semantic.borderRadius`
 * - `designTokens.elevation` → `tokens.semantic.shadow`
 * - `designTokens.animation` → `tokens.semantic.motion`
 * - `designTokens.zIndex` → `tokens.semantic.zIndex`
 */

import { tokens } from './tokens/index.css';

// Re-export for backward compatibility
export const designTokens = tokens;

// Legacy compatibility - re-export with old structure
export const vars = tokens.semantic;
