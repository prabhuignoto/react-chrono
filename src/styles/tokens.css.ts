/**
 * @deprecated This file is deprecated. Use `tokens` from '@/styles/tokens/index.css' instead.
 *
 * This legacy token contract is maintained for backward compatibility only.
 * It will be removed in a future major version.
 *
 * Migration guide:
 * - Old: `import { vars } from '@/styles/tokens.css'`
 * - New: `import { tokens } from '@/styles/tokens/index.css'`
 *
 * Token mapping:
 * - `vars.color` → `tokens.semantic.color`
 * - `vars.space` → `tokens.semantic.spacing`
 * - `vars.radius` → `tokens.semantic.borderRadius`
 * - `vars.font` → `tokens.semantic.typography`
 * - `vars.zIndex` → `tokens.semantic.zIndex`
 * - `vars.shadow` → `tokens.semantic.shadow`
 * - `vars.transition` → `tokens.semantic.motion`
 */

import { createThemeContract } from '@vanilla-extract/css';

// Legacy token contract - DO NOT USE IN NEW CODE
export const vars = createThemeContract({
  color: {
    text: null,
    background: null,
    primary: null,
    secondary: null,
    muted: null,
    cardBg: null,
    cardTitle: null,
    cardSubtitle: null,
    cardDetails: null,
    cardDetailsBackground: null,
    cardMediaBg: null,
    // Nested card properties
    nestedCardBg: null,
    nestedCardTitle: null,
    nestedCardSubtitle: null,
    nestedCardDetails: null,
    nestedCardDetailsBackground: null,
    // Icon properties
    icon: null,
    iconBackground: null,
    // Active state properties
    titleActive: null,
    // Additional detail properties
    details: null,
    // Toolbar and controls
    toolbarBg: null,
    toolbarBtnBg: null,
    toolbarText: null,
    // Button/controls borders and states
    buttonBorder: null,
    buttonHoverBorder: null,
    buttonHoverBg: null,
    buttonActiveBg: null,
    buttonActiveIcon: null,
    buttonActiveBorder: null,
    // Dark mode specific enhancements
    searchHighlight: null,
    darkToggleActiveBg: null,
    darkToggleActiveIcon: null,
    darkToggleActiveBorder: null,
    darkToggleGlow: null,
    // Effects
    shadow: null,
    glow: null,
  },
  space: { xs: null, sm: null, md: null, lg: null, xl: null },
  radius: { sm: null, md: null, lg: null },
  font: { body: null, mono: null },
  zIndex: {
    base: null,
    timelineCard: null,
    // Centralized z-index tokens to avoid magic numbers in styles
    controls: null,
    popover: null,
    outlinePane: null,
    verticalItem: null,
  },
  shadow: {
    elevationSm: null,
    elevationMd: null,
    elevationLg: null,
    insetSm: null,
    focusRing: null,
  },
  transition: {
    duration: { fast: null, normal: null, slow: null },
    easing: { standard: null, emphasized: null },
  },
});
