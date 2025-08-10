import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import styled, { css } from 'styled-components';
import { zIndex } from '../../styles/z-index';
import { ScrollBar } from '../common/styles';

// CSS transform and animation fallbacks
const getTransform = (transform?: string) => transform || 'none';

const transitionMixin = css`
  -webkit-transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  -ms-transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

// Timeline wrapper with improved cross-browser support
export const Wrapper = styled.div<{
  $cardPositionHorizontal?: 'TOP' | 'BOTTOM';
  theme?: Theme;
  $translate?: string;
  $isDarkMode?: boolean;
  $isFullscreen?: boolean;
  $timelineHeight?: string;
}>`
  -webkit-transform: ${(props) => getTransform(props.$translate)};
  -moz-transform: ${(props) => getTransform(props.$translate)};
  -ms-transform: ${(props) => getTransform(props.$translate)};
  transform: ${(props) => getTransform(props.$translate)};
  ${transitionMixin}
  display: flex;
  flex-direction: column;
  /* cannot remove this */
  height: ${(props) => props.$timelineHeight || '100%'};
  z-index: ${zIndex.timelineCard - 2}; /* Base z-index for timeline */

  &:focus {
    outline: 0;
  }

  overflow: visible; /* Changed from hidden to prevent toolbar cutoff */
  position: relative;
  width: 100%;

  &.horizontal {
    justify-content: flex-start;
  }

  &.js-focus-visible :focus:not(.focus-visible) {
    outline: 0;
  }

  &.js-focus-visible .focus-visible {
    outline: 2px solid #528deb;
    outline-offset: 2px;
  }

  /* Hide focus outline for toolbar-triggered navigation */
  &[data-toolbar-navigation="true"] :focus {
    outline: 0 !important;
  }

  /* Ensure keyboard navigation focus is visible */
  &[data-keyboard-focus="true"] :focus-visible {
    outline: 2px solid #528deb;
    outline-offset: 2px;
  }

  /* Fullscreen mode styles - comprehensive cross-browser support */
  &:fullscreen,
  &:-webkit-full-screen,
  &:-moz-full-screen,
  &:-ms-fullscreen,
  &:fullscreen::backdrop,
  &:-webkit-full-screen::backdrop,
  &:-moz-full-screen::backdrop,
  &:-ms-fullscreen::backdrop,
  &[data-fullscreen='true'] {
    background: ${(props) =>
      props.theme?.timelineBgColor ||
      (props.$isDarkMode ? '#000000' : '#ffffff')} !important;
    padding: 2rem !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: center !important;
    width: 100vw !important;
    height: 100vh !important;
    overflow-y: auto !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 999999 !important;

    /* Cross-browser adjustments */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;

    /* Ensure proper box-sizing across browsers */
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    /* Prevent scrollbar issues in different browsers */
    scrollbar-width: auto; /* Firefox */
    -ms-overflow-style: auto; /* IE/Edge */

    /* Ensure all children are properly centered and have max-width */
    > * {
      width: 100%;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  /* Additional Safari-specific fullscreen handling */
  &:-webkit-full-screen {
    /* Ensure Safari maintains proper layout */
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }

  /* Firefox-specific fullscreen adjustments */
  &:-moz-full-screen {
    /* Ensure Firefox maintains proper styling */
    -moz-appearance: none;
  }

  /* Separate backdrop styling for browsers that support it */
  &:fullscreen::backdrop,
  &:-webkit-full-screen::backdrop,
  &:-moz-full-screen::backdrop,
  &:-ms-fullscreen::backdrop {
    background: ${(props) =>
      props.theme?.timelineBgColor ||
      (props.$isDarkMode ? '#000000' : '#ffffff')} !important;
  }

  /* No need for special toolbar styling in wrapper fullscreen mode */
`;

export const TimelineMainWrapper = styled.div<{
  $scrollable?: boolean | { scrollbar: boolean };
  mode?: TimelineMode;
  position?: 'top' | 'bottom';
  theme?: Theme;
}>`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  /* Fill remaining height under/over the toolbar */
  flex: 1 1 auto;
  min-height: 0; /* allow content to shrink within flex container */
  overflow-y: auto;
  overflow-x: visible; /* Allow toolbar to overflow horizontally if needed */
  overscroll-behavior: contain;
  ${(p) => (p.mode === 'HORIZONTAL' ? 'position: relative' : '')};
  /* Removed scroll-behavior to prevent conflicts with programmatic scrolling */
  width: 100%;
  background-color: ${(p) => p.theme?.timelineBgColor || 'transparent'};
  /* order: ${(p) => (p.position === 'top' ? 1 : 0)}; */
  background: transparent;
  ${ScrollBar} &.horizontal {
    min-height: 150px;
  }

  padding: ${({ $scrollable }) =>
    !$scrollable ? '0 0.5rem 0' : ''}; /* Reduced horizontal padding */

  /* Improved scroll behavior for smoother transitions */
  scroll-behavior: auto; /* Let our custom scrolling handle the smooth behavior */

  /* Fullscreen mode styles for main wrapper */
  :fullscreen &,
  :-webkit-full-screen &,
  :-moz-full-screen &,
  :-ms-fullscreen &,
  [data-fullscreen='true'] & {
    background: transparent !important;
    flex: 1;
    overflow-y: auto;
    overflow-x: visible;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    min-height: 0; /* Allow flex shrinking */
  }
`;

export const TimelineMain = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(0, -50%);

  &.vertical {
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }

  &.horizontal {
    align-items: center;
    justify-content: center;
    // width: 100%;
    flex-direction: row;
  }
  
  &.horizontal_all {
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }

  /* Fullscreen mode styles for timeline main */
  :fullscreen & {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :fullscreen &.vertical,
  :-webkit-full-screen &.vertical,
  :-moz-full-screen &.vertical,
  :-ms-fullscreen &.vertical,
  [data-fullscreen='true'] &.vertical {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const Outline = styled.div<{ color?: string; height?: number }>`
  position: absolute;
  right: 0;
  left: 0;
  width: 100%;
  height: ${(p) => `${p.height || 3}px`};
  margin-right: auto;
  margin-left: auto;
  background: ${(p) => p.color || '#007bff'};
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  
  /* Show all cards horizontal mode - extend line */
  .show-all-cards-horizontal & {
    width: calc(100% + 2rem);
    left: -1rem;
  }
`;

export const TimelineControlContainer = styled.div<{
  active?: boolean;
  mode?: TimelineMode;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;

  filter: ${(p) => {
    if (p.active) {
      return `opacity(1);`;
    } else {
      return `opacity(0.9);`;
    }
  }};

  &.hide {
    visibility: hidden;
  }

  &.show {
    visibility: visible;
  }
`;

export const TimelineContentRender = styled.div<{ $showAllCards?: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: ${(p) => (p.$showAllCards ? 'flex-start' : 'center')};
  width: 98%;
  margin-right: auto;
  margin-left: auto;
  overflow-x: hidden;

  /* Fullscreen mode styles for content render */
  :fullscreen &,
  :-webkit-full-screen &,
  :-moz-full-screen &,
  :-ms-fullscreen &,
  [data-fullscreen='true'] & {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
`;

export const ToolbarWrapper = styled.div<{ position: 'top' | 'bottom' }>`
  display: flex;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  width: 100%;
  padding: 0.5rem 1rem;
  margin: ${(p) => (p.position === 'top' ? '0 0 16px 0' : '16px 0 0 0')};
  order: ${(p) => (p.position === 'top' ? 0 : 1)};
  z-index: ${zIndex.controls - 1};
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: auto;
  flex-wrap: wrap; /* Allow wrapping when content overflows */

  /* Ensure all direct children are vertically centered */
  > * {
    align-self: center;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.5rem;
    gap: 0.75rem;
    justify-content: center;
  }

  /* Fullscreen mode styles for toolbar - use multiple selectors */
  :fullscreen &,
  :-webkit-full-screen &,
  :-moz-full-screen &,
  :-ms-fullscreen &,
  [data-fullscreen='true'] & {
    position: sticky !important;
    top: 0 !important;
    z-index: 1000001 !important;
    background: ${(p) => {
      const theme = p.theme as Theme;
      // In fullscreen, ensure the toolbar has a visible background
      if (theme?.toolbarBgColor) {
        return theme.toolbarBgColor;
      }
      // Use a semi-transparent background as fallback
      return theme?.primary
        ? `${theme.primary}10`
        : 'rgba(255, 255, 255, 0.95)';
    }} !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    margin: 0 0 1rem 0 !important;
    width: 100% !important;
    max-width: 1200px !important;
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    height: auto !important;
    overflow: visible !important;
  }
`;

export const ExtraControls = styled.ul<{
  $hide: boolean;
  $slideShowRunning: boolean;
}>`
  display: flex;
  align-items: center;
  align-self: center;
  list-style: none;
  margin: 0;
  padding: 0.125rem;
  visibility: ${(p) => (p.$hide ? 'hidden' : 'visible')};
  flex-shrink: 0; /* Don't shrink, wrap instead */
  gap: 0.5rem;
  flex-wrap: wrap; /* Allow controls to wrap to next line */

  .control-wrapper {
    display: flex;
    align-items: center;
    align-self: center;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    order: 1;
  }
`;

export const ExtraControlChild = styled.li`
  display: flex;
  margin: 0.5rem 0;
  margin-right: 0.5rem;
`;

export const SearchWrapper = styled.div<{ theme?: Theme }>`
  display: flex;
  align-items: center;
  background-color: ${(p) => p.theme?.toolbarBtnBgColor};
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  border: 1px solid ${(p) => p.theme?.buttonBorderColor};
  width: 100%; /* Take full width of SearchGroup */
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
  min-height: 38px;
  position: relative;

  &:focus-within {
    border-color: ${(p) => p.theme?.primary};
    box-shadow: 0 0 0 2px ${(p) => p.theme?.glowColor};
    background-color: ${(p) =>
      p.theme?.toolbarBtnBgColor || 'rgba(255, 255, 255, 0.1)'};
  }

  &:hover {
    border-color: ${(p) => p.theme?.primary || p.theme?.buttonBorderColor};
  }
`;

export const SearchInput = styled.input<{ theme?: Theme }>`
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${(p) => {
    // Primary: Use toolbarTextColor if available
    if (p.theme?.toolbarTextColor) {
      return p.theme.toolbarTextColor;
    }
    // Fallback: Determine based on toolbar background or textColor
    if (p.theme?.textColor) {
      return p.theme.textColor;
    }
    // Final fallback: Dark vs light mode detection
    const isDarkMode =
      p.theme?.toolbarBgColor === '#111827' || p.theme?.primary === '#3b82f6';
    return isDarkMode ? '#f3f4f6' : '#1e293b';
  }};
  font-size: 0.9rem;
  padding: 0.4rem 0.2rem;
  min-height: 28px;

  &::placeholder {
    color: ${(p) => {
      // Primary: Use toolbar text color with reduced opacity
      if (p.theme?.toolbarTextColor) {
        return p.theme.toolbarTextColor;
      }
      // Secondary: Use secondary color if available
      if (p.theme?.secondary) {
        return p.theme.secondary;
      }
      // Tertiary: Determine based on dark/light mode
      const isDarkMode =
        p.theme?.toolbarBgColor === '#111827' || p.theme?.primary === '#3b82f6';
      return isDarkMode ? '#d1d5db' : '#6b7280';
    }};
    opacity: 0.8;
    font-weight: 400;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Ensure good contrast in dark mode */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${(p) => {
      // Use same logic as main color
      if (p.theme?.toolbarTextColor) {
        return p.theme.toolbarTextColor;
      }
      if (p.theme?.textColor) {
        return p.theme.textColor;
      }
      const isDarkMode =
        p.theme?.toolbarBgColor === '#111827' || p.theme?.primary === '#3b82f6';
      return isDarkMode ? '#f3f4f6' : '#1e293b';
    }} !important;
    -webkit-box-shadow: 0 0 0px 1000px
      ${(p) => p.theme?.toolbarBtnBgColor || 'transparent'} inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  &::-webkit-search-cancel-button {
    appearance: none;
    height: 10px;
    width: 10px;
    margin-left: 0.2rem;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="%23${(
      p,
    ) =>
      p.theme?.toolbarTextColor?.substring(
        1,
      )}"><path d=\"M.7.7l8.6 8.6M9.3.7L.7 9.3\" stroke=\"%23${(p) =>
      p.theme?.toolbarTextColor?.substring(1)}\" stroke-width=\"1.5\"/></svg>');
    cursor: pointer;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
`;

export const SearchInfo = styled.span<{ theme?: Theme }>`
  font-size: 0.8rem;
  color: ${(p) => p.theme?.toolbarTextColor};
  opacity: 0.8;
  margin: 0 0.4rem;
  white-space: nowrap;
  flex-shrink: 0;
`;

/* Container for search navigation controls */
export const SearchControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
  margin-left: auto;

  .timeline-nav-wrapper {
    display: flex;
    align-items: center;
  }
`;

/* Logical grouping containers for toolbar sections */
export const ToolbarSection = styled.div<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0; /* Don't shrink individual sections */

  /* Primary section (navigation controls) gets priority */
  ${({ $primary }) =>
    $primary &&
    `
      order: -1; /* Always appear first */
    `}

  @media (max-width: 768px) {
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

/* Navigation controls group */
export const NavigationGroup = styled(ToolbarSection)`
  /* Navigation controls stay together and don't wrap internally */
  flex-wrap: nowrap;
`;

/* Search group that can flex */
export const SearchGroup = styled(ToolbarSection)`
  flex: 1 1 300px; /* Allow search to grow and shrink */
  max-width: 600px;
  justify-content: center;

  @media (max-width: 480px) {
    flex: 1 1 auto;
    order: -1; /* Move to top on mobile */
    width: 100%;
  }
`;

/* Action controls group */
export const ActionGroup = styled(ToolbarSection)`
  flex-wrap: wrap; /* Allow action buttons to wrap within their group */
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
