import { Theme } from '@models/Theme'; // Assuming Theme model path
import { TimelineMode } from '@models/TimelineModel'; // Assuming TimelineModel path
import styled, { css, keyframes } from 'styled-components';

/**
 * Main container for the entire vertical timeline component.
 */
export const TimelineVerticalWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  width: 100%;
  padding: 0.25rem; /* Small padding around the timeline */
  outline: 0; /* Remove default outline */
  position: relative; /* Establish positioning context */
`;

/**
 * Keyframes for the fade-in animation of timeline items.
 */
const animateVisible = keyframes`
  from {
    opacity: 0;
    visibility: hidden; /* Start hidden */
  }
  to {
    opacity: 1;
    visibility: visible; /* Fade to visible */
  }
`;

/**
 * Props for the VerticalItemWrapper component.
 */
interface VerticalItemWrapperProps {
  /** Controls layout for alternating cards mode. */
  $alternateCards?: boolean;
  /** Explicit height for the card content area. */
  $cardHeight?: number; // Note: Consider if this prop is truly needed or if height should be intrinsic
  /** Style adjustments for items without card content. */
  $cardLess?: boolean;
  /** Indicates if the item is part of a nested timeline structure. */
  $isNested?: boolean;
  /** Theme object for styling. */
  theme?: Theme;
}

/**
 * Wrapper for a single timeline item (row), containing title, point, and content.
 * Handles visibility animation and basic layout.
 */
export const VerticalItemWrapper = styled.li<VerticalItemWrapperProps>`
  display: flex;
  position: relative;
  visibility: hidden; /* Initially hidden for animation */
  width: 100%;
  align-items: stretch; /* Stretch children vertically */
  justify-content: center; /* Center items horizontally */
  margin: 1rem 0; /* Vertical spacing between items */
  list-style: none; /* Remove default list styling */

  /* Alignment adjustments based on side (used in non-alternating modes) */
  &.left {
    margin-right: auto; /* Align left */
  }
  &.right {
    margin-left: auto; /* Align right */
  }

  /* Class added when the item should become visible */
  &.visible {
    visibility: visible;
    /* Consider adding animation here if needed, though content animates */
  }

  /* Styling for nested timelines */
  ${(p) =>
    p.$isNested && // Apply only if $isNested is true
    css`
      position: relative;

      /* Vertical connector line for nested items */
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        width: 2px; /* Line width */
        height: 2rem; /* Connector height */
        background: ${p.theme?.primary || '#007bff'}; /* Use theme color */
        left: 50%;
        transform: translateX(-50%);
        bottom: -2rem; /* Position below the item */
      }
    `}
`;

/**
 * Props for the TimelineCardContentWrapper component.
 */
interface TimelineCardContentWrapperProps {
  /** Controls layout for alternating cards mode. */
  $alternateCards?: boolean;
  /** Style adjustments for items without card content. */
  $cardLess?: boolean;
  /** Reverses the order of elements (content/point/title). */
  $flip?: boolean;
  /** Flag for mobile-specific styling adjustments. */
  $isMobile?: boolean;
  /** Indicates if the timeline item has no title, affecting layout. */
  $noTitle?: boolean;
  /** Explicit height for the card content area. */
  height?: number; // Consider if this should be min-height or if height is necessary
}

/**
 * Wrapper for the main content card of a timeline item.
 * Handles width, alignment, order, and visibility animation based on props.
 */
export const TimelineCardContentWrapper = styled.div<TimelineCardContentWrapperProps>`
  visibility: hidden; /* Initially hidden for animation */
  position: relative;
  display: flex;
  align-items: center; /* Vertically center content */

  /* --- Width Calculation --- */
  ${(p) => {
    // Alternating mode: Takes up ~half the space minus the point/title areas
    if (p.$alternateCards) {
      return `width: ${p.$isMobile ? '75%;' : '37.5%;'}`;
    }
    // No title mode: Takes up most of the space
    else if (p.$noTitle) {
      return `width: 95%;`;
    }
    // Default vertical mode: Takes up space minus the title area
    else {
      return `width: ${p.$isMobile ? '75%;' : '85%;'}`;
    }
  }}

  /* --- Order and Justification (Standard Layout) --- */
  ${(p) =>
    !p.$flip && // Apply only if NOT flipped
    css`
      &.left {
        order: 1; /* Content first */
        justify-content: flex-end; /* Align card content to the right (towards center) */
      }
      &.right {
        order: 3; /* Content last */
        justify-content: flex-start; /* Align card content to the left (towards center) */
      }
    `}

  /* --- Order and Justification (Flipped Layout) --- */
  ${(p) =>
    p.$flip && // Apply only if flipped
    css`
      justify-content: flex-end; /* Always align card content to the right */
      &.left {
        order: 3; /* Content last */
      }
      &.right {
        order: 1; /* Content first */
      }
    `}

  /* --- Visibility Animation --- */
  &.visible {
    visibility: visible;
    animation: ${animateVisible} 0.25s ease-in; /* Apply fade-in animation */
  }
`;

/**
 * Props for the TimelineTitleWrapper component.
 */
interface TimelineTitleWrapperProps {
  /** Controls layout for alternating cards mode. */
  $alternateCards?: boolean;
  /** Reverses the order of elements. */
  $flip?: boolean;
  /** Hides the title visually. */
  $hide?: boolean;
  /** Current timeline mode (e.g., VERTICAL, VERTICAL_ALTERNATING). */
  mode?: TimelineMode;
}

/**
 * Wrapper for the title/date section of a timeline item.
 * Handles width, alignment, and order based on props and mode.
 */
export const TimelineTitleWrapper = styled.div<TimelineTitleWrapperProps>`
  align-items: center; /* Vertically center title content */
  display: ${(p) =>
    p.$hide && p.mode === 'VERTICAL'
      ? 'none'
      : 'flex'}; /* Hide only if $hide and mode is VERTICAL */

  /* --- Width Calculation --- */
  width: ${(p) =>
    p.$alternateCards
      ? '37.5%' /* Takes up space in alternating mode */
      : '10%'}; /* Smaller width in standard vertical mode */

  /* --- Order and Justification --- */
  &.left {
    /* Justification depends on whether layout is flipped */
    justify-content: ${(p) => (p.$flip ? 'flex-end' : 'flex-start')};
    /* Order depends on flip status and mode */
    order: ${(p) => (p.$flip && p.mode === 'VERTICAL_ALTERNATING' ? '1' : '3')};
  }

  &.right {
    /* Justification depends on whether layout is flipped */
    justify-content: ${(p) => (p.$flip ? 'flex-start' : 'flex-end')};
     /* Order depends on flip status and mode */
    order: ${(p) => (p.$flip && p.mode === 'VERTICAL_ALTERNATING' ? '3' : '1')};
  }
`;
