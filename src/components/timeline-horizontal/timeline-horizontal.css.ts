import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';
import { tokens } from '../../styles/tokens/index.css';

export const timelineHorizontalWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    // Enable container queries for children
    containerType: 'inline-size',
  },
]);

export const timelineItemWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    visibility: 'visible',
    height: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    position: 'relative',
    padding: '0.5rem 1rem',
    gap: '0.5rem',
    background: `linear-gradient(
    to bottom,
    transparent 24%, 
    ${tokens.component.timeline.line.color} 24%,
    ${tokens.component.timeline.line.color} 28%,
    transparent 28%
    )`,
  },
]);

globalStyle(`${timelineHorizontalWrapper}.vertical`, {
  flexDirection: 'column',
});
globalStyle(`${timelineHorizontalWrapper}.horizontal`, {
  flexDirection: 'row',
  overflowX: 'visible',
  justifyContent: 'space-evenly',
});
globalStyle(`${timelineHorizontalWrapper}.horizontal_all`, {
  flexDirection: 'row',
  overflowX: 'hidden',
  overflowY: 'hidden',
  justifyContent: 'flex-start',
  // gap: '2rem',
  padding: '0 2rem',
});
globalStyle(`${timelineHorizontalWrapper}.show-all-cards-horizontal`, {
  overflowX: 'hidden',
  overflowY: 'hidden',
  justifyContent: 'flex-start',
  // gap: '1rem',
  width: '100%',
  flexWrap: 'nowrap', // Ensure items don't wrap to new line
});

globalStyle(`${timelineItemWrapper}.vertical`, {
  marginBottom: '2rem',
  width: '100%',
});
globalStyle(`${timelineItemWrapper}.visible`, { visibility: 'visible' });

globalStyle(`.show-all-cards-horizontal ${timelineItemWrapper}`, {
  visibility: 'visible',
  display: 'flex', // Ensure display is flex
  // margin: '0 0.5rem',
  flexShrink: 0,
  minWidth: 'fit-content', // Ensure minimum width for content
  opacity: 1, // Ensure full opacity
});

// Responsive styles for horizontal timeline
globalStyle(`${timelineHorizontalWrapper}`, {
  '@media': {
    '(max-width: 768px)': {
      padding: '0 0.5rem',
    },
    '(max-width: 480px)': {
      padding: '0 0.25rem',
    },
  },
});

globalStyle(`${timelineItemWrapper}`, {
  '@media': {
    '(max-width: 768px)': {
      padding: '0 0.5rem',
      minHeight: '120px', // Changed from height to minHeight to prevent clipping
    },
    '(max-width: 480px)': {
      padding: '0 0.25rem',
      minHeight: '120px', // Increased from 100px and changed to minHeight
    },
  },
});

// Remove focus ring from the list item itself in horizontal timeline
// The focus ring should only appear on the inner card content, not the wrapper
globalStyle(`li.timeline-horz-item-container:focus`, {
  outline: 'none',
});

globalStyle(`li.timeline-horz-item-container:focus-visible`, {
  outline: 'none',
  boxShadow: 'none',
});

// ============================================================================
// PSEUDO-ELEMENT BASED TIMELINE LINE
// ============================================================================
// Use ::before pseudo-elements on list items to create connecting lines
// This eliminates the need for a separate outline line and complex alignment
// ============================================================================

// Main timeline item container - simple flex column layout
// No gap between point and title to ensure they're vertically aligned
globalStyle(`.timeline-horizontal-item`, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  position: 'relative',
  gap: '0', // No gap - title should be directly below point section
});

// Timeline point section - at the top
// This section contains the point and will be used as reference for line alignment
// The line will be positioned relative to this section's center for responsive alignment
globalStyle(
  `[data-mode="HORIZONTAL"] .timeline-horizontal-item .timeline-point-section,
              [data-mode="HORIZONTAL_ALL"] .timeline-horizontal-item .timeline-point-section`,
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 10, // Above the connecting line
    padding: '0.5rem',
    flexShrink: 0,
    // Use min-height to accommodate the point while allowing flexibility
    // Point is typically 2rem, so 3rem accommodates point + padding
    minHeight: '3rem',
    // Ensure the section can grow if needed but maintains minimum for alignment
    height: 'auto',
  },
);

// Title section - directly below the point section
// Positioned immediately after the point section for vertical alignment
globalStyle(
  `[data-mode="HORIZONTAL"] .timeline-horizontal-item .timeline-title-section,
              [data-mode="HORIZONTAL_ALL"] .timeline-horizontal-item .timeline-title-section`,
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 5, // Above the connecting line
    padding: '0.5rem',
    minHeight: '3rem', // Consistent spacing for title
    flexShrink: 0,
    // Ensure title starts immediately after point section
    marginTop: '0',
    marginBottom: '0',
  },
);

// Card section - below the title
globalStyle(`.timeline-horizontal-item .timeline-card-section`, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  position: 'relative',
  flexGrow: 1,
  minHeight: 0,
  flexShrink: 0,
});

// Connecting line using ::before pseudo-element on the point section itself
// This makes the line position relative to the point section center, ensuring it stays aligned
// regardless of responsive padding changes on the list item
// The line extends from the center of the current point to connect with the next point
globalStyle(
  `[data-mode="HORIZONTAL"] .timeline-horizontal-item .timeline-point-section::before,
              [data-mode="HORIZONTAL_ALL"] .timeline-horizontal-item .timeline-point-section::before`,
  {
    content: '""',
    position: 'absolute',
    // Position at the exact center of the point section (vertically and horizontally)
    top: '50%',
    left: '50%', // Start from center of current point
    // Extend far to the right to connect with the next point
    // Using a large width that will be clipped by the container
    width: '9999px', // Large enough to extend to next point
    // Use theme token for line width
    height: tokens.component.timeline.line.width,
    // Use theme token for line color
    backgroundColor: tokens.component.timeline.line.color,
    zIndex: 1, // Behind the point (which has z-index 10) but visible
    transform: 'translateY(-50%)', // Center vertically, start from point center horizontally
    pointerEvents: 'none', // Don't interfere with interactions
    // Force visibility
    visibility: 'visible',
    opacity: 1,
  },
);

// Don't show the extending line on the last item
globalStyle(
  `[data-mode="HORIZONTAL"] .timeline-horizontal-item:last-child .timeline-point-section::before,
              [data-mode="HORIZONTAL_ALL"] .timeline-horizontal-item:last-child .timeline-point-section::before,
              [data-mode="HORIZONTAL"] li.timeline-horz-item-container:last-child .timeline-point-section::before,
              [data-mode="HORIZONTAL_ALL"] li.timeline-horz-item-container:last-child .timeline-point-section::before`,
  {
    display: 'none',
  },
);

// For RTL layouts, reverse the line direction
globalStyle(
  `[dir="rtl"] [data-mode="HORIZONTAL"] .timeline-horizontal-item .timeline-point-section::before,
              [dir="rtl"] [data-mode="HORIZONTAL_ALL"] .timeline-horizontal-item .timeline-point-section::before`,
  {
    left: 'auto',
    right: '50%',
    transform: 'translateY(-50%)',
  },
);

// Ensure the point section and its parent allow the line to extend properly
globalStyle(
  `[data-mode="HORIZONTAL"] .timeline-horizontal-item .timeline-point-section,
              [data-mode="HORIZONTAL_ALL"] .timeline-horizontal-item .timeline-point-section`,
  {
    overflow: 'visible', // Allow the line to extend beyond the section
  },
);

// Ensure the list item also allows overflow for the line
globalStyle(
  `[data-mode="HORIZONTAL"] li.timeline-horz-item-container,
              [data-mode="HORIZONTAL_ALL"] li.timeline-horz-item-container`,
  {
    overflow: 'visible', // Allow the line to extend to the next item
  },
);

// Ensure connecting lines are visible
// The line extends from the point section, so we need overflow visible on parent containers
// Note: Some modes use overflowX: auto for scrolling, which is fine - the line will still be visible
