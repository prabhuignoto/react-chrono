import { VerticalItemModel } from '@models/TimelineVerticalModel';
import cls from 'classnames';
import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  FunctionComponent,
  ReactElement,
} from 'react';
import { useTimelineContext } from '../contexts';
import TimelineCard from '../timeline-elements/timeline-card-content/timeline-card-content';
import TimelineItemTitle from '../timeline-elements/timeline-item-title/timeline-card-title';
import { TimelinePoint } from './timeline-point';
import {
  timelineCardContentVisible,
  timelineCardContentWrapper,
  timelineTitleWrapper,
  verticalItemWrapper,
  verticalItemWrapperNested,
} from './timeline-vertical.css';
import { computeCssVarsFromTheme } from '../../styles/theme-bridge';

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
): ReactElement => {
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
  } = props;

  // Use unified context
  const {
    theme,
    mode,
    cardHeight,
    flipLayout,
    lineWidth,
    cardLess,
    mediaHeight,
    textOverlay,
    classNames,
    timelinePointDimension,
    disableClickOnCircle,
    disableInteraction,
  } = useTimelineContext();
  const isMobile = mode === 'VERTICAL';

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
      <div
        className={`${timelineTitleWrapper} ${className} ${flipLayout ? 'flipped' : ''}`}
        data-mode={mode}
        style={{
          ...computeCssVarsFromTheme(theme),
          display: !title && mode === 'VERTICAL' ? 'none' : 'flex',
          width: alternateCards ? '37.5%' : '10%',
        }}
      >
        <TimelineItemTitle
          title={title as string}
          active={active && !disableInteraction} // Highlight if active and interaction enabled
          theme={theme}
          // Align text based on layout mode
          align={flipLayout && !alternateCards ? 'left' : 'right'}
          classString={classNames?.title} // Optional custom class
        />
      </div>
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
        'vertical-item-row',
        { [className]: !!className },
        { visible: visible },
        { 'no-alt': !alternateCards },
      ),
    [className, visible, alternateCards],
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
   * Determines if the title section should be rendered.
   * Show title when there is a title text and it's not nested.
   */
  const canShowTitle = useMemo(() => {
    // Show title if it exists and it's not a nested component
    return !!title && !isNested;
  }, [title, isNested]);

  // Get a readable title for screen readers
  const accessibleTitle = useMemo(() => {
    if (typeof title === 'string') {
      return title;
    } else if (typeof cardTitle === 'string') {
      return cardTitle;
    } else {
      return 'Timeline item';
    }
  }, [title, cardTitle]);

  // Render the complete timeline item structure
  return (
    <li
      className={`${verticalItemWrapper} ${verticalItemClass} ${isNested ? verticalItemWrapperNested : ''}`}
      data-testid="vertical-item-row"
      data-item-id={id}
      key={id}
      ref={contentRef}
      style={computeCssVarsFromTheme(theme)}
      aria-current={active ? 'step' : undefined}
      aria-label={accessibleTitle}
      role="listitem"
      tabIndex={active ? 0 : -1}
      aria-selected={active}
    >
      {/* Conditionally render the Title */}
      {canShowTitle ? Title : null}

      {/* Wrapper for the card content */}
      <div
        className={`${timelineCardContentWrapper} ${contentClass} ${visible ? timelineCardContentVisible : ''}`}
        style={{
          width: alternateCards
            ? isMobile
              ? '75%'
              : '37.5%'
            : !title
              ? '95%'
              : isMobile
                ? '75%'
                : '85%',
          justifyContent: (() => {
            const flip = !alternateCards && flipLayout;
            if (flip) return 'flex-end';
            return className === 'left' ? 'flex-end' : 'flex-start';
          })(),
          order: (() => {
            const flip = !alternateCards && flipLayout;
            if (className === 'left') return flip ? 3 : 1;
            return flip ? 1 : 3;
          })(),
        }}
      >
        {/* Conditionally render the TimelineCard (only if not cardLess mode) */}
        {!cardLess ? (
          <TimelineCard
            active={active}
            branchDir={className} // Pass 'left' or 'right'
            content={cardSubtitle}
            customContent={contentDetailsChildren}
            detailedText={cardDetailedText as string | string[]}
            hasFocus={hasFocus}
            id={id}
            media={media}
            onClick={onClick}
            onElapsed={onElapsed}
            onShowMore={handleShowMore} // Pass down the memoized handler
            slideShowActive={slideShowRunning}
            theme={theme}
            url={url}
            // Flip card content only in non-alternating vertical mode
            flip={!alternateCards && flipLayout}
            timelineContent={timelineContent}
            items={items} // Pass nested items data
            isNested={isNested}
            nestedCardHeight={nestedCardHeight}
            title={cardTitle as string} // Card-specific title
            cardTitle={title as string} // Item title (might be redundant if cardTitle is used)
          />
        ) : null}
      </div>

      {/* Conditionally render the Timeline Point (hidden for nested items) */}
      {!isNested ? TimelinePointMemo : null}
    </li>
  );
};

// Set display name for React DevTools
VerticalItem.displayName = 'VerticalItem';

export default VerticalItem;
