import { TimelineVerticalModel } from '@models/TimelineVerticalModel';
import {
  useCallback,
  useContext,
  FunctionComponent,
  ReactNode,
  memo,
  useMemo,
  ReactElement,
} from 'react';
import { GlobalContext } from '../GlobalContext';
import TimelineVerticalItem from './timeline-vertical-item';
import { TimelineVerticalWrapper } from './timeline-vertical.styles';

/**
 * Renders the main vertical timeline structure.
 * It maps over the provided `items` array and renders a `TimelineVerticalItem`
 * for each, handling layout variations (like alternating cards) and distributing
 * props and callbacks appropriately.
 *
 * @param {TimelineVerticalModel} props - The properties for the TimelineVertical component.
 * @returns {JSX.Element} The rendered TimelineVertical component.
 */
const TimelineVertical: FunctionComponent<TimelineVerticalModel> = memo(
  ({
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
  }: TimelineVerticalModel): ReactElement => {
    // Access global context, specifically to check for mobile view
    const { isMobile } = useContext(GlobalContext);

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
        // Call the autoScroll prop function if it exists
        autoScroll?.({
          contentHeight: height,
          contentOffset: wrapperOffset,
          pointOffset: offset,
        });
      },
      [autoScroll], // Dependency: only recreate if autoScroll function changes
    );

    // Memoize the items rendering to avoid unnecessary recreations
    const renderItems = useMemo(() => {
      return items.map((item, index: number) => {
        let itemClassName = ''; // CSS class for layout ('left' or 'right')

        // Determine layout class based on mode and index
        // In alternating mode on non-mobile views, alternate 'left' and 'right'
        if (alternateCards && !isMobile) {
          itemClassName = index % 2 === 0 ? 'left' : 'right';
        }
        // Otherwise (non-alternating or mobile), default to 'right'
        else {
          itemClassName = 'right';
        }

        // Extract specific content details node for this item, if provided
        const contentDetails: ReactNode | null =
          (contentDetailsChildren &&
            Array.isArray(contentDetailsChildren) && // Ensure it's an array
            contentDetailsChildren[index]) ?? // Get node at the current index
          null;

        // Determine the custom icon for this item
        let customIcon: ReactNode | null = null;
        if (Array.isArray(iconChildren)) {
          // If iconChildren is an array, map icon to item by index
          customIcon = iconChildren[index] ?? null;
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
            index={index} // Pass down the item's index
            key={item.id ?? `timeline-item-${index}`} // Unique key for React rendering
            onActive={handleOnActive} // Pass down the memoized active handler
            onClick={onClick} // Pass down the global click handler
            onElapsed={onElapsed} // Pass down the global elapsed handler
            // Removed onShowMore as the handler was empty
            slideShowRunning={slideShowRunning} // Pass down the slideshow state
            cardLess={cardLess} // Pass down the cardLess flag
            nestedCardHeight={nestedCardHeight} // Pass down the nested card height
          />
        );
      });
    }, [
      items,
      isMobile,
      alternateCards,
      contentDetailsChildren,
      iconChildren,
      hasFocus,
      handleOnActive,
      onClick,
      onElapsed,
      slideShowRunning,
      cardLess,
      nestedCardHeight,
    ]);

    // Render the main timeline wrapper
    return (
      <TimelineVerticalWrapper as="ul" data-testid="tree-main">
        {renderItems}
      </TimelineVerticalWrapper>
    );
  },
);

// Set display name for React DevTools
TimelineVertical.displayName = 'TimelineVertical';

export default TimelineVertical;
