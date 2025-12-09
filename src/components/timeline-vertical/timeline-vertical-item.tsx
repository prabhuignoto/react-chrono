import { VerticalItemModel } from '@models/TimelineVerticalModel';
import cls from 'classnames';
import {
  useCallback,
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
  timelineItemTitleWrapper,
  verticalItemWrapper,
  verticalItemWrapperNested,
} from './timeline-vertical.css';
import { pickDefined } from '../../utils/propUtils';

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
    rovingProps, // Roving tabindex props for keyboard navigation (WCAG 2.1.1)
  } = props;

  // Extract only used context values to avoid unused variable warnings
  const {
    theme,
    mode,
    flipLayout,
    lineWidth,
    cardLess,
    classNames,
    timelinePointDimension,
    disableClickOnCircle,
    disableInteraction,
    isMobile,
    isDarkMode,
  } = useTimelineContext();

  // Helper functions for layout calculations
  const calculateCardWidth = useCallback(() => {
    if (alternateCards) {
      return isMobile ? '75%' : '37.5%';
    }
    return isMobile ? '75%' : '85%';
  }, [alternateCards, isMobile]);

  const calculateJustifyContent = useCallback(() => {
    const flip = !alternateCards && flipLayout;
    if (flip) return 'flex-end';
    return className === 'left' ? 'flex-end' : 'flex-start';
  }, [alternateCards, flipLayout, className]);

  const calculateCardOrder = useCallback(() => {
    if (alternateCards) {
      // Alternating mode: left side = card first (1), right side = card last (3)
      return className === 'left' ? 1 : 3;
    }

    if (flipLayout) {
      // Vertical flip mode: card first (1)
      return 1;
    }

    // Standard vertical mode: card last (3)
    return 3;
  }, [alternateCards, flipLayout, className]);


  const calculatePointOrder = useCallback(() => {
    return 2;
  }, []);

  const calculateEmptySpaceOrder = useCallback(() => {
    if (alternateCards) {
      return className === 'left' ? 3 : 1;
    }
    return null;
  }, [alternateCards, className]);

  // Computed layout flags
  const isFlipMode = useMemo(
    () => !alternateCards && flipLayout,
    [alternateCards, flipLayout],
  );

  const isLeftSide = useMemo(() => className === 'left', [className]);

  const shouldShowTitle = useMemo(
    () => Boolean(title && !isNested && !isMobile),
    [title, isNested, isMobile],
  );

  const shouldShowEmptySpace = useMemo(
    () => alternateCards && !isNested && !isMobile,
    [alternateCards, isNested, isMobile],
  );

  const shouldShowTimelinePoint = useMemo(() => !isNested, [isNested]);

  const alignment = useMemo(() => {
    if (alternateCards) {
      return isLeftSide ? 'left' : 'right';
    }
    return 'center';
  }, [alternateCards, isLeftSide]);

  const cardPadding = useMemo(
    () => (alternateCards ? '0' : '0.75rem'),
    [alternateCards],
  );

  const titleAlignSelf = useMemo(
    () => (isFlipMode ? { alignSelf: 'flex-end' as const } : {}),
    [isFlipMode],
  );

  const cardMarginLeft = useMemo(
    () => (isFlipMode ? { marginLeft: 'auto' } : {}),
    [isFlipMode],
  );

  const activeTitleProp = useMemo(() => {
    if (active === undefined) return {};
    return { active: active && !disableInteraction };
  }, [active, disableInteraction]);

  const cardOnClickProp = useMemo(() => {
    if (onClick && typeof onClick === 'function') {
      return { onClick };
    }
    return {};
  }, [onClick]);

  const ariaCurrent = useMemo(
    () => (active ? 'step' : undefined),
    [active],
  );

  const EmptySpace = useMemo(() => {
    if (!shouldShowEmptySpace) return null;
    
    const emptySpaceOrder = calculateEmptySpaceOrder();
    if (emptySpaceOrder === null) return null;
    
    return (
      <div
        style={{
          order: emptySpaceOrder,
          width: '37.5%',
          minHeight: '100%',
          flexShrink: 0,
          flexGrow: 0,
        }}
        aria-hidden="true"
      />
    );
  }, [shouldShowEmptySpace, calculateEmptySpaceOrder]);

  /**
   * Callback handler triggered by the TimelinePoint when it becomes active.
   * Calculates the item's position and notifies the parent.
   */
  const handleOnActive = useCallback(
    (offset: number) => {
      if (contentRef.current && onActive) {
        const { offsetTop, clientHeight } = contentRef.current;
        onActive(offsetTop + offset, offsetTop, clientHeight);
      }
    },
    [onActive],
  );

  /**
   * Handler for the "Read More" action within the card.
   * Recalculates position after content changes with a small delay.
   */
  const handleShowMore = useCallback(() => {
    setTimeout(() => handleOnActive(0), 100);
  }, [handleOnActive]);


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

  // TimelinePoint props configuration
  const timelinePointProps = useMemo(
    () => ({
      className,
      mode,
      onActive: handleOnActive,
      onClick: onClick || (() => {}),
      isMobile,
      ...pickDefined({
        active,
        alternateCards,
        id,
        slideShowRunning,
        iconChild,
        timelinePointDimension,
        lineWidth,
        disableClickOnCircle,
        cardLess,
        isNested,
      }),
    }),
    [
      active,
      alternateCards,
      className,
      id,
      mode,
      handleOnActive,
      onClick,
      slideShowRunning,
      iconChild,
      timelinePointDimension,
      lineWidth,
      disableClickOnCircle,
      cardLess,
      isMobile,
      title,
      theme,
      isNested,
    ],
  );

  const TimelinePointMemo = useMemo(
    () => (
      <div
        style={{
          order: calculatePointOrder(),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          minHeight: '100%',
          width: '10%',
          position: 'relative',
          zIndex: -1,
          flexShrink: 0,
          flexGrow: 0,
        }}
      >
        <TimelinePoint {...timelinePointProps} />
      </div>
    ),
    [timelinePointProps, calculatePointOrder],
  );


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

  // Computed className for main wrapper
  const wrapperClassName = useMemo(
    () =>
      `${verticalItemWrapper({
        visible: visible !== false,
        alignment,
        alternating: alternateCards,
      })} ${verticalItemClass} ${isNested ? verticalItemWrapperNested : ''}`,
    [visible, alignment, alternateCards, verticalItemClass, isNested],
  );

  // Computed className for card content wrapper
  const cardContentClassName = useMemo(
    () =>
      `${timelineCardContentWrapper} ${contentClass} ${
        visible ? timelineCardContentVisible : ''
      }`,
    [contentClass, visible],
  );

  // Computed card content styles
  const cardContentStyles = useMemo(
    () => ({
      width: calculateCardWidth(),
      justifyContent: calculateJustifyContent(),
      order: calculateCardOrder(),
      display: 'flex' as const,
      flexDirection: 'column' as const,
      flexShrink: 0,
      flexGrow: 0,
      paddingLeft: cardPadding,
      paddingRight: cardPadding,
      ...cardMarginLeft,
    }),
    [
      calculateCardWidth,
      calculateJustifyContent,
      calculateCardOrder,
      cardPadding,
      cardMarginLeft,
    ],
  );

  // Render the complete timeline item structure
  return (
    <li
      className={wrapperClassName}
      data-testid="vertical-item-row"
      data-item-id={id}
      key={id}
      ref={contentRef}
      aria-current={ariaCurrent}
      aria-label={accessibleTitle}
      role="listitem"
      aria-selected={active}
      tabIndex={rovingProps?.tabIndex ?? -1}
      onKeyDown={rovingProps?.onKeyDown}
      onFocus={rovingProps?.onFocus}
    >
      {/* Wrapper for the card content */}
      <div className={cardContentClassName} style={cardContentStyles}>
        {shouldShowTitle && (
          <div className={timelineItemTitleWrapper} style={titleAlignSelf}>
            <TimelineItemTitle
              title={title}
              theme={theme}
              align="left"
              {...activeTitleProp}
              {...pickDefined({
                classString: classNames?.title,
              })}
            />
          </div>
        )}
        {!cardLess && (
          <TimelineCard
            branchDir={className}
            onShowMore={handleShowMore}
            flip={isFlipMode}
            {...pickDefined({
              active,
              content: cardSubtitle,
              customContent: contentDetailsChildren,
              detailedText: cardDetailedText as string | string[],
              hasFocus,
              id,
              media,
              onElapsed,
              slideShowActive: slideShowRunning,
              theme,
              url,
              timelineContent,
              items,
              isNested,
              nestedCardHeight,
              title: cardTitle,
              cardTitle: title,
            })}
            {...cardOnClickProp}
          />
        )}
      </div>

      {/* Empty space for alternating mode to balance layout after removing title column */}
      {EmptySpace}

      {/* Conditionally render the Timeline Point (hidden for nested items) */}
      {shouldShowTimelinePoint && TimelinePointMemo}
    </li>
  );
};

// Set display name for React DevTools
VerticalItem.displayName = 'VerticalItem';

export default VerticalItem;
