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
  },
});


