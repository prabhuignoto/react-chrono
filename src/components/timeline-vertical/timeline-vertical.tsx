import { TimelineVerticalModel } from '@models/TimelineVerticalModel'; // Assuming model paths
import {
  useCallback,
  useContext,
  FunctionComponent, // Explicit import
  ReactNode,
  JSX, // Explicit import
  useRef, // Added for container ref
  useState, // Added for forcing update if needed (might not be necessary)
  useEffect, // Added for potential update trigger
  useMemo,
} from 'react';
import { GlobalContext } from '../GlobalContext'; // Context for global settings
import TimelineVerticalItem from './timeline-vertical-item'; // The component for rendering each item
import { TimelineVerticalWrapper } from './timeline-vertical.styles'; // The main styled wrapper
import { useVirtualScroll } from '../hooks/useVirtualScroll'; // Import the hook

// Define estimated height (consider making this configurable via props or context)
const ESTIMATED_ITEM_HEIGHT = 250; // px

// Extend props to include optional virtualization config
interface TimelineVerticalProps extends TimelineVerticalModel {
  virtualization?: {
    estimatedItemHeight?: number;
    containerHeight?: string | number;
    buffer?: number;
    scrollDebounceMs?: number;
    fixedContainerHeight?: number;
    extraBufferBelow?: number;
    smoothScrolling?: boolean;
    useIntersectionObserver?: boolean;
    dynamicBuffering?: boolean;
    useGPUAcceleration?: boolean;
  };
}

/**
 * Renders the main vertical timeline structure with virtual scrolling.
 * It uses the useVirtualScroll hook to render only the visible items.
 *
 * @param {TimelineVerticalModel} props - The properties for the TimelineVertical component.
 * @returns {JSX.Element} The rendered TimelineVertical component.
 */
const TimelineVertical: FunctionComponent<TimelineVerticalProps> = ({
  // Props with default values
  alternateCards = true, // Default to alternating card layout on desktop
  // Callbacks and data props
  autoScroll, // Function to handle automatic scrolling when an item becomes active
  contentDetailsChildren, // Optional array of custom nodes for each item's card details
  hasFocus, // Does the timeline component itself have focus? (Passed down)
  iconChildren, // Optional custom icon(s) for the timeline points
  items, // Array of timeline item data objects
  mode, // Timeline mode (e.g., VERTICAL, VERTICAL_ALTERNATING) - Used by children via context?
  onClick, // Global click handler for items (passed down)
  onElapsed, // Global handler for media elapsed events (passed down)
  onOutlineSelection, // Handler for outline selection (potentially unused here, passed down?)
  slideShowRunning, // Is a slideshow active? (Passed down)
  theme, // Theme object (Used by children via context or styled-components)
  cardLess, // Render without cards? (Passed down)
  nestedCardHeight, // Specific height for nested cards (Passed down)
  virtualization, // New prop for config
}: TimelineVerticalProps): JSX.Element => {
  const { isMobile } = useContext(GlobalContext);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container
  const measuredHeightsRef = useRef<Record<number, number>>({}); // Ref to store measured heights
  // Force update state (simple way to trigger re-render for hook recalculation)
  const [, forceUpdate] = useState({});
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  // Get config from props or use defaults
  const estimatedHeight =
    virtualization?.estimatedItemHeight || ESTIMATED_ITEM_HEIGHT;
  const containerHeight = virtualization?.containerHeight || '80vh';
  const buffer = virtualization?.buffer || 5;
  const scrollDebounceMs = virtualization?.scrollDebounceMs || 50;
  const fixedContainerHeight = virtualization?.fixedContainerHeight;
  const extraBufferBelow = virtualization?.extraBufferBelow || 10;
  const smoothScrolling = virtualization?.smoothScrolling ?? true;
  const useIntersectionObserver =
    virtualization?.useIntersectionObserver ?? true;
  const dynamicBuffering = virtualization?.dynamicBuffering ?? true;
  const useGPUAcceleration = virtualization?.useGPUAcceleration ?? true;

  // Use the enhanced virtual scroll hook with all advanced features
  const {
    startIndex,
    endIndex,
    paddingTop,
    totalHeight,
    visibleIndices,
    scrollDirection,
    scrollVelocity,
    registerSentinelElement,
  } = useVirtualScroll({
    itemCount: items.length,
    estimatedItemHeight: estimatedHeight,
    containerRef: scrollContainerRef,
    buffer,
    measuredHeightsRef,
    scrollDebounceMs,
    fixedContainerHeight,
    extraBufferBelow,
    useIntersectionObserver,
    dynamicBuffering,
  });

  // Register sentinel elements for intersection observer if enabled
  useEffect(() => {
    if (useIntersectionObserver) {
      if (topSentinelRef.current) {
        registerSentinelElement?.(startIndex, topSentinelRef.current);
      }
      if (bottomSentinelRef.current) {
        registerSentinelElement?.(endIndex, bottomSentinelRef.current);
      }
    }
  }, [startIndex, endIndex, registerSentinelElement, useIntersectionObserver]);

  // Callback for items to report their height with optimized updates
  const handleMeasureHeight = useCallback(
    (index: number, height: number) => {
      if (measuredHeightsRef.current[index] !== height) {
        measuredHeightsRef.current[index] = height;
        // Only force update if:
        // 1. This item is near the viewport
        // 2. The height difference is significant (> 10%)
        if (
          (Math.abs(index - startIndex) < 20 ||
            Math.abs(index - endIndex) < 20) &&
          Math.abs(
            height - (measuredHeightsRef.current[index] || estimatedHeight),
          ) >
            estimatedHeight * 0.1
        ) {
          forceUpdate({});
        }
      }
    },
    [startIndex, endIndex, estimatedHeight],
  );

  /**
   * Callback handler passed to each TimelineVerticalItem's onActive.
   * When an item becomes active (e.g., scrolls into view), this triggers the autoScroll function
   * provided via props, allowing the parent component to scroll the timeline if needed.
   * @param {number} offset - Vertical offset within the active item's point element.
   * @param {number} wrapperOffset - The offsetTop of the active item's wrapper relative to the scroll parent.
   * @param {number} height - The clientHeight of the active item's wrapper.
   */
  const handleOnActive = useCallback(
    (offset: number, wrapperOffset: number, height: number) => {
      let actualOffsetFromTop = 0;
      for (let i = 0; i < startIndex; i++) {
        actualOffsetFromTop += measuredHeightsRef.current[i] || estimatedHeight;
      }
      const adjustedWrapperOffset =
        actualOffsetFromTop + (wrapperOffset - paddingTop);

      autoScroll?.({
        contentHeight: height,
        contentOffset: adjustedWrapperOffset,
        pointOffset: offset,
      });
    },
    [autoScroll, paddingTop, startIndex, estimatedHeight],
  );

  // Get the slice of items to render
  const visibleItems = items.slice(startIndex, endIndex + 1);

  // Adjusts transition speed based on scroll velocity for smoother appearance
  const getTransitionDuration = useCallback(() => {
    if (!smoothScrolling) return '0ms';

    if (scrollDirection === 'up') {
      // Slow transition when scrolling up for smoother appearance
      return '150ms';
    } else if (scrollDirection === 'down') {
      // Fast or no transition when scrolling down to prevent jitter
      // Use a very short transition time for very slow scrolls
      return scrollVelocity < 0.1 ? '50ms' : '0ms';
    }

    return '0ms';
  }, [scrollDirection, scrollVelocity, smoothScrolling]);

  // Optimize for better scrolling by applying correct CSS transitions based on scroll direction and velocity
  const innerContainerStyle = useMemo(() => {
    const style: React.CSSProperties = {
      transform: `translateY(${paddingTop}px)`,
      transition: `transform ${getTransitionDuration()} ease-out`,
    };

    // Add GPU acceleration hints only when needed
    if (useGPUAcceleration) {
      style.willChange = 'transform';
      style.backfaceVisibility = 'hidden';
      style.perspective = '1000px';
      style.transformStyle = 'preserve-3d';
    }

    return style;
  }, [paddingTop, getTransitionDuration, useGPUAcceleration]);

  // Container styles with GPU acceleration when appropriate
  const containerStyle = useMemo(() => {
    const style: React.CSSProperties = {
      height: containerHeight,
      overflowY: 'auto' as const,
      position: 'relative' as const,
      WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
    };

    if (useGPUAcceleration) {
      style.willChange = 'scroll-position';
    }

    return style;
  }, [containerHeight, useGPUAcceleration]);

  // Render the main timeline wrapper
  return (
    // Scrollable container with fixed height and overflow
    <div
      ref={scrollContainerRef}
      style={containerStyle}
      data-testid="virtual-scroll-container"
    >
      {/* Inner container representing total height and applying top padding */}
      <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
        {/* Invisible sentinel for the top of the visible area */}
        {useIntersectionObserver && (
          <div
            ref={topSentinelRef}
            data-index={startIndex}
            style={{
              height: '1px',
              position: 'absolute',
              top: paddingTop - 10,
              width: '100%',
            }}
          />
        )}

        <TimelineVerticalWrapper
          data-testid="tree-main" // Test ID
          role="list" // Accessibility role
        >
          {/* Apply positioning transform to shift visible items down */}
          <div style={innerContainerStyle}>
            {/* Map over the VISIBLE items array to render each timeline entry */}
            {visibleItems.map((item, index) => {
              // IMPORTANT: Calculate the original index for props like key, handlers, etc.
              const originalIndex = startIndex + index;

              let itemClassName = ''; // CSS class for layout ('left' or 'right')

              // Determine layout class based on mode and index
              // In alternating mode on non-mobile views, alternate 'left' and 'right'
              if (alternateCards && !isMobile) {
                itemClassName = originalIndex % 2 === 0 ? 'left' : 'right';
              }
              // Otherwise (non-alternating or mobile), default to 'right'
              else {
                itemClassName = 'right';
              }

              // Extract specific content details node for this item, if provided
              const contentDetails: ReactNode | null =
                (contentDetailsChildren &&
                  Array.isArray(contentDetailsChildren) && // Ensure it's an array
                  contentDetailsChildren[originalIndex]) || // Get node at the current index
                null;

              // Determine the custom icon for this item
              let customIcon: ReactNode | null = null;
              if (Array.isArray(iconChildren)) {
                // If iconChildren is an array, map icon to item by index
                customIcon = iconChildren[originalIndex] || null;
              } else if (iconChildren) {
                // If iconChildren is a single node, apply it to all items
                customIcon = iconChildren;
              }

              // Render the individual timeline item component
              return (
                <TimelineVerticalItem
                  {...item} // Spread all properties from the item data object
                  // --- Pass down calculated or specific props ---
                  alternateCards={alternateCards} // Pass down the alternating mode flag
                  className={itemClassName} // Pass down the calculated 'left'/'right' class
                  contentDetailsChildren={contentDetails} // Pass down the specific content details node
                  iconChild={customIcon} // Pass down the specific icon node
                  hasFocus={hasFocus} // Pass down the focus state
                  index={originalIndex} // Pass down the item's index
                  key={item.id || `timeline-item-${originalIndex}`} // Unique key for React rendering
                  onActive={handleOnActive} // Pass down the memoized active handler
                  onClick={onClick} // Pass down the global click handler
                  onElapsed={onElapsed} // Pass down the global elapsed handler
                  slideShowRunning={slideShowRunning} // Pass down the slideshow state
                  cardLess={cardLess} // Pass down the cardLess flag
                  nestedCardHeight={nestedCardHeight} // Pass down the nested card height
                  // Pass the measurement handler
                  onMeasureHeight={handleMeasureHeight}
                  // Pass the visibility flag
                  isVisible={visibleIndices.has(originalIndex)}
                />
              );
            })}
          </div>
        </TimelineVerticalWrapper>

        {/* Invisible sentinel for the bottom of the visible area */}
        {useIntersectionObserver && (
          <div
            ref={bottomSentinelRef}
            data-index={endIndex}
            style={{
              height: '1px',
              position: 'absolute',
              bottom: totalHeight - (paddingTop + endIndex * estimatedHeight),
              width: '100%',
            }}
          />
        )}
      </div>
    </div>
  );
};

// Set display name for React DevTools
TimelineVertical.displayName = 'TimelineVertical';

export default TimelineVertical;
