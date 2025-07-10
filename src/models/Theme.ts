export interface Theme {
  // card background color
  cardBgColor?: string;

  // card details background color
  cardDetailsBackGround?: string;

  // card details color
  cardDetailsColor?: string;

  cardMediaBgColor?: string;

  // card subtitle color
  cardSubtitleColor?: string;

  // card title color
  cardTitleColor?: string;

  // details color
  detailsColor?: string;

  // icon background color
  iconBackgroundColor?: string;

  // nested card background color
  nestedCardBgColor?: string;

  nestedCardDetailsBackGround?: string;

  // nested card details color
  nestedCardDetailsColor?: string;

  // nested card subtitle color
  nestedCardSubtitleColor?: string;

  // nested card title color
  nestedCardTitleColor?: string;

  // primary color
  primary?: string;

  // secondary color
  secondary?: string;

  // text color
  textColor?: string;

  // title color
  titleColor?: string;

  // title color for active tabs
  titleColorActive?: string;

  toolbarBgColor?: string;

  toolbarBtnBgColor?: string;

  toolbarTextColor?: string;

  timelineBgColor?: string;

  // === New Dark Mode Configurable Properties ===

  // Icon colors for better visibility in dark mode
  iconColor?: string;

  // Button hover and active states
  buttonHoverBgColor?: string;
  buttonActiveBgColor?: string;
  buttonActiveIconColor?: string;

  // Border colors for enhanced contrast
  buttonBorderColor?: string;
  buttonHoverBorderColor?: string;
  buttonActiveBorderColor?: string;

  // Shadow and glow effects
  shadowColor?: string;
  glowColor?: string;

  // Search highlighting
  searchHighlightColor?: string;

  // Dark mode toggle specific styling
  darkToggleActiveBgColor?: string;
  darkToggleActiveIconColor?: string;
  darkToggleActiveBorderColor?: string;
  darkToggleGlowColor?: string;
}

// Default export for module compatibility
export default Theme;
