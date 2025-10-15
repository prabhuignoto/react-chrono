import { createThemeContract } from '@vanilla-extract/css';

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
