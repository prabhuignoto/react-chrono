import { VerticalItemModel } from '@models/TimelineVerticalModel'; // Assuming model path
import cls from 'classnames'; // Utility for conditionally joining classNames
import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  FunctionComponent, // Explicit import
  JSX, // Explicit import for clarity
} from 'react';
import { GlobalContext } from '../GlobalContext'; // Context for global theme/settings
import TimelineCard from '../timeline-elements/timeline-card-content/timeline-card-content'; // Card component
import TimelineItemTitle from '../timeline-elements/timeline-item-title/timeline-card-title'; // Title component
import { TimelinePoint } from './timeline-point'; // Point component (dot/icon on the line)
import {
  TimelineCardContentWrapper,
  TimelineTitleWrapper,
  VerticalItemWrapper,
} from './timeline-vertical.styles'; // Associated styled components

/**
 * Represents a single item (row) in the vertical timeline.
 * It coordinates the display of the title, the central point/icon,
 * and the main content card based on the provided props and global context.
 *
 * @param {VerticalItemModel} props - The properties for the VerticalItem component.
 * @returns {JSX.Element} The rendered VerticalItem component.
 */
const VerticalItem: FunctionComponent<VerticalItemModel> = (
  props: VerticalItemModel,
): JSX.Element => {
  // Ref to the main list item element for calculating position/dimensions
  const contentRef = useRef<HTMLLIElement>(null);

  // Destructure all props for cleaner access
  const {
    active, // Is this item currently highlighted/active?
    alternateCards, // Layout mode: alternate card sides?
    cardDetailedText, // Detailed text content for the card
    cardSubtitle, // Subtitle/main content for the card
    cardTitle, // Title specifically for the card (distinct from the timeline item title)
    url, // URL for navigation, potentially used by the card
    className, // CSS class for the side ('left' or 'right')
    contentDetailsChildren, // Custom React nodes for card details area
    iconChild, // Custom React node for the timeline point/icon
    hasFocus, // Does the card content have focus (e.g., for slideshow)?
    id, // Unique ID for the item
    media, // Media element (image/video) for the card
    onActive, // Callback when item becomes active (e.g., scrolled into view)
    onClick, // Callback when the item (or point) is clicked
    onElapsed, // Callback when media finishes playing (if applicable)
    slideShowRunning, // Is a slideshow currently active?
    title, // Title for the timeline item itself (often a date or heading)
    visible, // Is this item currently visible in the viewport?
    timelineContent, // Custom React nodes for the main timeline content area
    items, // Data for nested items (if any)
    isNested, // Is this item part of a nested structure?
    nestedCardHeight, // Specific height for nested cards
    'data-testid': testId, // Destructure the test ID
  } = props;

  // Access global settings and theme from context
  const {
    cardHeight, // Default card height
    mode, // Timeline mode (VERTICAL, VERTICAL_ALTERNATING)
    flipLayout, // Reverse layout order (title/point/card)?
    timelinePointDimension, // Size of the timeline point
    lineWidth, // Width of the timeline central line
    disableClickOnCircle, // Prevent clicks on the timeline point?
    cardLess, // Mode without cards, only points/titles
    theme, // Theme object
    classNames, // Custom class names for sub-elements
    textOverlay, // Style where text overlays media
    mediaHeight, // Height for media elements
    disableInteraction, // Disable all user interactions?
    isMobile, // Is the view currently mobile?
  } = useContext(GlobalContext);

  /**
   * Callback handler triggered by the TimelinePoint when it becomes active.
   * Calculates the item's position and notifies the parent.
   * @param {number} offset - Vertical offset within the point element itself.
   */
  const handleOnActive = useCallback(
    (offset: number) => {
      if (contentRef.current && onActive) {
        const { offsetTop, clientHeight } = contentRef.current;
        // Call the parent's onActive with calculated position data
        onActive(offsetTop + offset, offsetTop, clientHeight);
      }
    },
    [onActive], // Dependency: only recreate if onActive changes
  );

  /**
   * Handler for the "Read More" action within the card.
   * Uses a short timeout to likely ensure the DOM has updated (card expanded)
   * before recalculating the active position.
   */
  const handleShowMore = useCallback(() => {
    // Use timeout to defer execution, allowing potential layout shifts to settle
    setTimeout(() => {
      handleOnActive(0); // Recalculate position after content change
    }, 100); // Small delay (adjust if needed)
  }, [handleOnActive]); // Dependency: handleOnActive

  /**
   * Memoized Timeline Item Title component.
   * Avoids re-rendering the title if its specific props haven't changed.
   */
  const Title = useMemo(() => {
    return (
      <TimelineTitleWrapper
        className={className} // 'left' or 'right'
        $alternateCards={alternateCards} // Pass prop to styled-component
        mode={mode}
        $hide={!title} // Hide wrapper if no title text
        // Flip title position only in non-alternating vertical mode
        $flip={!alternateCards && flipLayout}
      >
        <TimelineItemTitle
          title={title}
          active={active && !disableInteraction} // Highlight if active and interaction enabled
          theme={theme}
          // Align text based on layout mode
          align={flipLayout && !alternateCards ? 'left' : 'right'}
          classString={classNames?.title} // Optional custom class
        />
      </TimelineTitleWrapper>
    );
  }, [
    active,
    title,
    className,
    alternateCards,
    mode,
    flipLayout,
    theme,
    classNames?.title, // Correct dependency
    disableInteraction, // Added dependency
  ]);

  /**
   * Memoized CSS classes for the main VerticalItemWrapper.
   * Includes the side ('left'/'right'), visibility, and base class.
   */
  const verticalItemClass = useMemo(
    () =>
      cls(
        'vertical-item-row', // Base class
        { [className]: !!className }, // Add 'left' or 'right' if className is present
        { visible: visible }, // Add 'visible' class if visible prop is true
      ),
    [className, visible],
  );

  /**
   * Memoized CSS classes for the TimelineCardContentWrapper.
   */
  const contentClass = useMemo(
    () =>
      cls(
        'card-content-wrapper', // Base class
        { [className]: !!className }, // Add 'left' or 'right'
        { visible: visible }, // Add 'visible' class
      ),
    [className, visible],
  );

  /**
   * Memoized Timeline Point component.
   * Avoids re-rendering the point if its specific props haven't changed.
   */
  const TimelinePointMemo = useMemo(
    () => (
      <TimelinePoint
        active={active}
        alternateCards={alternateCards}
        className={className} // 'left' or 'right'
        id={id}
        mode={mode}
        onActive={handleOnActive} // Pass down the memoized handler
        onClick={onClick}
        slideShowRunning={slideShowRunning}
        iconChild={iconChild} // Custom icon
        timelinePointDimension={timelinePointDimension}
        lineWidth={lineWidth}
        disableClickOnCircle={disableClickOnCircle}
        cardLess={cardLess}
        isMobile={isMobile}
      />
    ),
    [
      // Comprehensive dependency list for memoization
      active,
      alternateCards,
      className,
      id,
      mode,
      handleOnActive, // Use the memoized callback
      onClick,
      slideShowRunning,
      iconChild,
      timelinePointDimension,
      lineWidth,
      disableClickOnCircle,
      cardLess,
      isMobile,
    ],
  );

  /**
   * Memoized Timeline Card component.
   * Avoids re-rendering the card if its specific props haven't changed.
   */
  const TimelineCardMemo = useMemo(() => {
    // Conditionally render the TimelineCard (only if not cardLess mode)
    return !cardLess ? (
      <TimelineCardContentWrapper
        $alternateCards={alternateCards}
        $flip={!alternateCards && flipLayout}
        className={contentClass}
      >
        <TimelineCard
          active={active}
          branchDir={className}
          content={cardSubtitle}
          customContent={contentDetailsChildren}
          detailedText={cardDetailedText}
          hasFocus={hasFocus}
          id={id}
          media={media}
          onClick={onClick}
          onElapsed={onElapsed}
          onShowMore={handleShowMore}
          theme={theme}
          url={url}
          timelineContent={timelineContent}
          items={items}
          isNested={isNested}
          nestedCardHeight={nestedCardHeight}
          title={cardTitle}
        />
      </TimelineCardContentWrapper>
    ) : null;
  }, [
    // Comprehensive dependency list
    cardLess,
    contentClass,
    alternateCards,
    mode,
    flipLayout,
    active,
    className,
    cardSubtitle,
    contentDetailsChildren,
    timelineContent,
    cardDetailedText,
    hasFocus,
    id,
    media,
    onClick,
    onElapsed,
    handleShowMore,
    theme,
    cardTitle,
    url,
    nestedCardHeight,
    cardHeight,
    classNames,
    textOverlay,
    mediaHeight,
    items,
    isNested,
  ]);

  return (
    <VerticalItemWrapper
      // --- Standard React props ---
      className={verticalItemClass} // Apply memoized classes
      data-testid={testId} // Pass the test ID here
      key={id} // Key for React list rendering
      ref={contentRef} // Attach ref for measurements
    >
      {/* Render title, point, and card based on layout settings */}
      {flipLayout ? (
        <>
          {TimelineCardMemo}
          {TimelinePointMemo}
          {Title}
        </>
      ) : (
        <>
          {Title}
          {TimelinePointMemo}
          {TimelineCardMemo}
        </>
      )}
    </VerticalItemWrapper>
  );
};

// Set display name for React DevTools
VerticalItem.displayName = 'VerticalItem';

export default VerticalItem;
