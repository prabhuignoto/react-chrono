import { createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    text: null,
    background: null,
    primary: null,
    muted: null,
    cardBg: null,
    cardTitle: null,
    cardSubtitle: null,
    cardDetails: null,
    // Toolbar and controls
    toolbarBg: null,
    toolbarBtnBg: null,
    toolbarText: null,
    icon: null,
    // Button/controls borders and states
    buttonBorder: null,
    buttonHoverBorder: null,
    buttonHoverBg: null,
    buttonActiveBg: null,
    // Effects
    shadow: null,
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
