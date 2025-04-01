import { TimelinePointModel } from '@models/TimelineVerticalModel'; // Assuming model path
import cls from 'classnames'; // Utility for conditionally joining classNames
import {
  memo, // Import memo for component optimization
  useContext,
  useEffect,
  useMemo,
  useRef,
  FunctionComponent, // Explicit import
  MouseEvent,
  JSX, // Explicit import for event type
} from 'react';
import { GlobalContext } from '../GlobalContext'; // Context for global theme/settings
// Shape seems to be a shared styled component, potentially defined elsewhere
import { Shape } from '../timeline-elements/timeline-card/timeline-horizontal-card.styles';
import {
  TimelinePointContainer,
  TimelinePointWrapper,
} from './timeline-vertical-shape.styles'; // Associated styled components

/**
 * Renders the circular point or icon on the timeline line for a vertical item.
 * Handles click events, active state highlighting, custom icons, and appearance
 * based on global theme and configuration settings. It uses React.memo for
 * performance optimization.
 *
 * @param {TimelinePointModel} props - The properties for the TimelinePoint component.
 * @returns {JSX.Element} The rendered TimelinePoint component.
 */
const TimelinePoint: FunctionComponent<TimelinePointModel> = memo(
  (props: TimelinePointModel): JSX.Element => {
    const {
      className, // 'left' or 'right' - passed to styled components
      id, // Unique ID of the timeline item
      onClick, // Callback function when the point is clicked
      active, // Is this point currently active/highlighted?
      onActive, // Callback function when the point should trigger the 'active' state calculation
      slideShowRunning, // Is a slideshow currently active? (disables onClick)
      iconChild, // Custom React node to display inside the point (replaces default shape)
      timelinePointDimension, // Size (width/height) of the point
      lineWidth, // Width of the timeline line connecting points
      disableClickOnCircle, // Should clicks on the point be ignored?
      cardLess, // Is the timeline in 'cardLess' mode?
      isMobile, // Is the view currently mobile?
    } = props;

    // Ref to the button element representing the point
    const circleRef = useRef<HTMLButtonElement>(null);
    // Access global settings from context
    const {
      theme, // Theme object (primary color, etc.)
      focusActiveItemOnLoad, // Should the initially active item trigger 'onActive' immediately?
      timelinePointShape, // Shape of the point (e.g., 'circle', 'square')
      disableTimelinePoint, // Globally disable/hide all timeline points?
    } = useContext(GlobalContext);

    // Ref to track if this is the component's first render cycle
    const isFirstRender = useRef(true);

    /**
     * Determines if the onActive callback should be invoked based on the active state
     * and whether it's the initial render (controlled by focusActiveItemOnLoad).
     */
    const canInvokeOnActive = useMemo(() => {
      // If focusing on load is enabled, invoke if active.
      if (focusActiveItemOnLoad) {
        return active;
      }
      // Otherwise, invoke only if active AND it's not the first render.
      else {
        return active && !isFirstRender.current;
      }
    }, [active, focusActiveItemOnLoad]); // Dependencies: active state and global setting

    /**
     * Effect to call the onActive callback when conditions are met.
     * This usually happens when an item scrolls into view or is programmatically activated.
     */
    useEffect(() => {
      if (canInvokeOnActive && onActive && circleRef.current) {
        // Call the parent's onActive handler with the point's offsetTop
        onActive(circleRef.current.offsetTop);
      }
      // Intentionally excluding onActive from dependencies if it's stable,
      // otherwise, include it if it might change. Usually, it's stable.
    }, [canInvokeOnActive, active]); // Re-run when activation condition or active state changes

    /**
     * Memoized CSS classes for the inner Shape component.
     * Applies 'active' class and 'using-icon' if a custom icon is provided.
     */
    const circleClass = useMemo(
      () =>
        cls({
          active: active, // Apply 'active' class if the point is active
          'using-icon': !!iconChild, // Apply class if a custom icon is used
        }),
      [active, iconChild], // Dependencies: active state and presence of iconChild
    );

    /**
     * Memoized click handler props for the TimelinePointContainer button.
     * Only adds onClick if clicks are enabled and slideshow isn't running.
     */
    const clickHandlerProps = useMemo(() => {
      // Return empty object (no click handler) if clicks are disabled
      if (disableClickOnCircle) {
        return {};
      }

      // Return props containing the onClick handler
      return {
        onClick: (ev: MouseEvent) => {
          ev.stopPropagation(); // Prevent event bubbling up
          // Call the provided onClick handler if it exists, passing the item ID
          if (id && onClick && !slideShowRunning) {
            onClick(id);
          }
        },
      };
    }, [id, onClick, slideShowRunning, disableClickOnCircle]); // Dependencies for the click logic

    /**
     * Effect to update the isFirstRender flag after the initial render is complete.
     */
    useEffect(() => {
      // This effect runs only once after the initial mount
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
    }, []); // Empty dependency array ensures it runs only once

    // Render the timeline point structure
    return (
      <TimelinePointWrapper
        // --- Props passed to styled-component ---
        width={lineWidth} // Controls the width of the connecting lines (via ::before/::after)
        bg={theme?.primary} // Background color for the connecting lines
        $cardLess={cardLess} // Pass cardLess state
        $isMobile={isMobile} // Pass mobile state
        // --- Standard React props ---
        className={className} // 'left' or 'right'
        data-testid="tree-leaf" // Test ID for the wrapper
      >
        {/* Container is a button for accessibility and click handling */}
        <TimelinePointContainer
          // --- Props passed to styled-component ---
          $hide={disableTimelinePoint} // Hide based on global setting
          // --- Standard React props ---
          className={`${className} timeline-vertical-circle`} // Combine classes
          {...clickHandlerProps} // Spread the memoized click handler props
          ref={circleRef} // Attach ref for position measurement
          data-testid="tree-leaf-click" // Test ID for the clickable element
          aria-label="Timeline Point" // Accessibility label
          disabled={disableClickOnCircle || disableTimelinePoint} // Disable button if needed
        >
          {/* The visual shape (circle, square, or custom icon) */}
          <Shape
            // --- Props passed to styled-component ---
            theme={theme}
            dimension={timelinePointDimension} // Controls the size
            $timelinePointShape={timelinePointShape} // Controls the shape ('circle', 'square')
            // --- Standard React props ---
            className={circleClass} // Apply 'active' and 'using-icon' classes
          >
            {/* Render custom icon if provided, otherwise relies on Shape's default appearance */}
            {iconChild ? iconChild : null}
          </Shape>
        </TimelinePointContainer>
      </TimelinePointWrapper>
    );
  },
  // Use default shallow comparison for memoization.
  // The previous custom comparison (prev.active === next.active && prev.isMobile === next.isMobile)
  // was too restrictive and would prevent updates when other props like iconChild, theme, onClick, etc., changed.
  // Default shallow comparison is generally safer unless profiling reveals a specific need for a custom function.
);

// Set display name for React DevTools
TimelinePoint.displayName = 'TimelinePoint';

export { TimelinePoint }; // Export the component
