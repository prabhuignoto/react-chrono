import styled from 'styled-components';

/**
 * Props for the TimelinePointWrapper component.
 */
interface TimelinePointWrapperProps {
  /** Indicates if the timeline item has no card content, affecting layout. */
  $cardLess?: boolean;
  /** Flag for mobile-specific styling adjustments. */
  $isMobile?: boolean;
  /** Background color for the timeline line and point elements. */
  bg?: string;
  /** Width of the timeline line. Defaults to 4px. */
  width?: number;
}

/**
 * Wrapper for the central point/icon on the timeline branch.
 * Handles positioning and the vertical lines connecting points.
 */
export const TimelinePointWrapper = styled.div<TimelinePointWrapperProps>`
  /* Flexbox alignment */
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;

  /* Adjust width based on mobile view */
  width: ${(p) => (p.$isMobile ? '25%' : '10%')};

  /* Control the horizontal order in VERTICAL_ALTERNATING mode */
  &.left {
    order: 2; /* Appears between title and content */
  }
  &.right {
    order: 1; /* Appears first */
  }

  /* Top vertical line segment (connecting to the previous item) */
  &::before {
    background: ${(p) => p.bg || p.theme?.primary}; /* Use theme primary as fallback */
    width: ${(p) => (p.width ? `${p.width}px` : '4px')};
    height: 2rem; /* Fixed height for the connector */
    position: absolute;
    content: '';
    display: block;
    left: 50%;
    top: -1rem; /* Position above the point */
    transform: translateY(-50%) translateX(-50%); /* Center horizontally */
  }

  /* Main vertical line segment (extending downwards) */
  &::after {
    background: ${(p) => p.bg || p.theme?.primary}; /* Use theme primary as fallback */
    content: '';
    display: block;
    height: 100%; /* Extend full height of the wrapper */
    left: 50%;
    position: absolute;
    width: ${(p) => (p.width ? `${p.width}px` : '4px')};
    z-index: 0; /* Behind the point */
    transform: translateX(-50%); /* Center horizontally */
  }
`;

/**
 * Props for the TimelinePointContainer component.
 */
interface TimelinePointContainerProps {
  /** Hides the point visually if true. */
  $hide?: boolean;
}

/**
 * Container for the actual timeline point/icon (e.g., a circle or custom icon).
 * This is often implemented as a button for accessibility/interactivity.
 */
export const TimelinePointContainer = styled.button<TimelinePointContainerProps>`
  position: relative; /* Ensure it's above the ::after pseudo-element */
  z-index: 1;
  visibility: ${(p) => (p.$hide ? 'hidden' : 'visible')}; /* Control visibility */

  /* Reset button styles */
  background: none;
  border: 0;
  padding: 0; /* Remove default padding */
  cursor: pointer; /* Indicate interactivity */

  /* Add focus styles for accessibility */
  &:focus {
    outline: 2px solid ${(p) => p.theme?.primary || '#007bff'}; /* Example focus ring */
    outline-offset: 2px;
  }

  &:disabled {
    cursor: default; /* Indicate non-interactive state */
  }
`;
