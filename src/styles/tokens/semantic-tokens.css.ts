/**
 * @deprecated This file is deprecated and no longer used.
 * 
 * All semantic tokens have been consolidated into the unified token system.
 * This file is kept only to prevent build errors during migration.
 * 
 * Use `tokens` from '@/styles/tokens/index.css' instead.
 */

import { tokens } from './index.css';

// Re-export for any legacy references (though none should exist)
export const semanticTokens = tokens.semantic;
export const defaultSemanticTheme = tokens.semantic;
