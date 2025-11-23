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
  timelineTitleWrapper,
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
    isMobile, // Use responsive detection from context
  } = useTimelineContext();

  // Helper functions for layout calculations
  const calculateCardWidth = useCallback(() => {
    if (alternateCards) {
      return isMobile ? '75%' : '37.5%';
    }
    if (!title) {
      return '95%';
    }
    return isMobile ? '75%' : '85%';
  }, [alternateCards, isMobile, title]);

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

  const calculateTitleOrder = useCallback(() => {
    if (alternateCards) {
      // Alternating mode: left side = title last (3), right side = title first (1)
      return className === 'left' ? 3 : 1;
    }

    if (flipLayout) {
      // Vertical flip mode: title last (3)
      return 3;
    }

    // Standard vertical mode: title first (1)
    return 1;
  }, [alternateCards, flipLayout, className]);

  const calculatePointOrder = useCallback(() => {
    // Point is always in the middle (order 2) for all modes
    return 2;
  }, []);

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

  // Memoized title display configuration
  const titleConfig = useMemo(
    () => ({
      display:
        (!title && mode === 'VERTICAL') || (isMobile && !alternateCards)
          ? 'none'
          : 'flex',
      width: alternateCards ? '37.5%' : '10%',
      // Fix text alignment for alternating mode:
      // - Left side (title appears last): align left
      // - Right side (title appears first): align right
      textAlign: alternateCards
        ? className === 'left'
          ? 'left'
          : 'right'
        : ('right' as 'left' | 'right'),
      align: (flipLayout && !alternateCards ? 'left' : 'right') as
        | 'left'
        | 'right',
    }),
    [title, mode, alternateCards, flipLayout, className, isMobile],
  );

  const titleClassName = useMemo(
    () => `${timelineTitleWrapper} ${className} ${flipLayout ? 'flipped' : ''}`,
    [className, flipLayout],
  );

  const Title = useMemo(
    () => (
      <div
        className={titleClassName}
        data-mode={mode}
        style={{
          display: titleConfig.display,
          width: titleConfig.width,
          order: calculateTitleOrder(),
          // textAlign: titleConfig.textAlign,
          // Add proper spacing for title
          paddingLeft: alternateCards ? '0' : '0.75rem',
          paddingRight: alternateCards ? '0' : '0.75rem',
          marginRight: alternateCards && className === 'right' ? '1rem' : '0',
          marginLeft: alternateCards && className === 'left' ? '1rem' : '0',
        }}
      >
        <TimelineItemTitle
          title={title as string}
          theme={theme}
          align={titleConfig.textAlign}
          {...(active !== undefined
            ? { active: active && !disableInteraction }
            : {})}
          {...pickDefined({
            classString: classNames?.title,
          })}
        />
      </div>
    ),
    [
      titleClassName,
      mode,
      titleConfig.textAlign,
      title,
      active,
      disableInteraction,
      classNames?.title,
      calculateTitleOrder,
      alternateCards,
      className,
    ],
  );

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
      onClick: onClick || (() => { }),
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
          width: alternateCards ? '10%' : '10%',
          position: 'relative',
          zIndex: -1,
          // Add proper spacing margins
          marginLeft: alternateCards ? '1rem' : '0.75rem',
          marginRight: alternateCards ? '1rem' : '0.75rem',
        }}
      >
        <TimelinePoint {...timelinePointProps} />
      </div>
    ),
    [timelinePointProps, calculatePointOrder, alternateCards],
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
      className={`${verticalItemWrapper({
        visible: visible !== false,
        alignment: alternateCards
          ? className === 'left'
            ? 'left'
            : 'right'
          : 'center',
        alternating: alternateCards,
      })} ${verticalItemClass} ${isNested ? verticalItemWrapperNested : ''}`}
      data-testid="vertical-item-row"
      data-item-id={id}
      key={id}
      ref={contentRef}
      aria-current={active ? 'step' : undefined}
      aria-label={accessibleTitle}
      role="listitem"
      aria-selected={active}
      tabIndex={rovingProps?.tabIndex ?? -1}
      onKeyDown={rovingProps?.onKeyDown}
      onFocus={rovingProps?.onFocus}
    >
      {/* Conditionally render the Title */}
      {canShowTitle ? Title : null}

      {/* Wrapper for the card content */}
      <div
        className={`${timelineCardContentWrapper} ${contentClass} ${visible ? timelineCardContentVisible : ''}`}
        style={{
          width: calculateCardWidth(),
          justifyContent: calculateJustifyContent(),
          order: calculateCardOrder(),
          // Add proper spacing for card content
          paddingLeft: alternateCards ? '0' : '0.75rem',
          paddingRight: alternateCards ? '0' : '0.75rem',
          marginLeft:
            alternateCards && className === 'left'
              ? '0'
              : alternateCards && className === 'right'
                ? '1rem'
                : '0',
          marginRight:
            alternateCards && className === 'right'
              ? '0'
              : alternateCards && className === 'left'
                ? '1rem'
                : '0',
        }}
      >
        {!cardLess && (
          <TimelineCard
            branchDir={className}
            onShowMore={handleShowMore}
            flip={!alternateCards && flipLayout}
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
              title: cardTitle as string,
              cardTitle: title as string,
            })}
            {...(onClick && typeof onClick === 'function' ? { onClick } : {})}
          />
        )}
      </div>

      {/* Conditionally render the Timeline Point (hidden for nested items) */}
      {!isNested ? TimelinePointMemo : null}
    </li>
  );
};

// Set display name for React DevTools
VerticalItem.displayName = 'VerticalItem';

export default VerticalItem;
