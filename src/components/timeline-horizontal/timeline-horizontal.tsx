import { TimelineHorizontalModel } from '@models/TimelineHorizontalModel';
import cls from 'classnames';
import React, {
  ReactNode,
  useContext,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { useTimelineContext } from '../contexts';
import { pickDefined } from '../../utils/propUtils';
import TimelineCard from '../timeline-elements/timeline-card/timeline-horizontal-card';
import {
  timelineHorizontalWrapper,
  timelineItemWrapper,
} from './timeline-horizontal.css';

/**
 * TimelineHorizontal
 * @property {TimelineHorizontalModel} items - The items to be displayed in the timeline.
 * @property {(item: TimelineItem) => void} handleItemClick - Function to handle item click.
 * @property {boolean} autoScroll - Whether to auto-scroll the timeline.
 * @property {string} wrapperId - The ID of the wrapper element.
 * @property {boolean} slideShowRunning - Whether the slideshow is running.
 * @property {() => void} onElapsed - Function to handle elapsed time.
 * @property {React.ReactNode} contentDetailsChildren - The children nodes for content details.
 * @property {boolean} hasFocus - Whether the timeline has focus.
 * @property {React.ReactNode} iconChildren - The children nodes for icons.
 * @property {number} nestedCardHeight - The height of the nested card.
 * @property {boolean} isNested - Whether the card is nested.
 * @returns {JSX.Element} The TimelineHorizontal component.
 */

const TimelineHorizontal: React.FunctionComponent<TimelineHorizontalModel> = ({
  items,
  handleItemClick,
  autoScroll,
  wrapperId,
  slideShowRunning,
  onElapsed,
  contentDetailsChildren: children,
  hasFocus,
  iconChildren,
  nestedCardHeight,
  isNested,
  mode: propMode,
}: TimelineHorizontalModel) => {
  // Use unified context
  const {
    theme,
    mode: contextMode,
    itemWidth,
    cardHeight,
    flipLayout,
    showAllCardsHorizontal,
    cardWidth,
  } = useTimelineContext();

  // Prioritize prop mode over context mode
  const mode = propMode || contextMode;

  // Memoize the wrapper class to avoid unnecessary re-renders
  const wrapperClass = useMemo(
    () =>
      cls(
        mode.toLowerCase(),
        'timeline-horizontal-container',
        showAllCardsHorizontal ? 'show-all-cards-horizontal' : '',
      ),
    [mode, showAllCardsHorizontal],
  );

  // Ref to the horizontal list to scope focus queries
  const listRef = useRef<HTMLUListElement>(null);

  // Find and focus the active timeline point button when items update
  const activeId = useMemo(() => items.find((i) => i.active)?.id, [items]);

  useEffect(() => {
    if (!activeId) return;
    // In both horizontal modes, focus the active point button if it exists
    const root = listRef.current ?? document;
    const activePoint = root.querySelector(
      `button[data-testid="timeline-circle"][data-item-id="${activeId}"]`,
    ) as HTMLButtonElement | null;
    if (activePoint) {
      requestAnimationFrame(() => {
        try {
          activePoint.focus({ preventScroll: false });
        } catch (_) {
          // ignore focus errors
        }
      });
    }
  }, [activeId]);

  const iconChildColln = useMemo(
    () => React.Children.toArray(iconChildren),
    [iconChildren],
  );

  // Memoize the timeline items to prevent unnecessary re-renders
  const timelineItems = useMemo(() => {
    return items.map((item, index) => (
      <li
        key={item.id}
        className={cls(
          timelineItemWrapper,
          item.visible || showAllCardsHorizontal ? 'visible' : '',
          'timeline-horz-item-container',
        )}
        style={{
          width: itemWidth,
          minWidth: showAllCardsHorizontal ? itemWidth : undefined,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100%',
        }}
        aria-current={item.active ? 'true' : undefined}
        id={`timeline-${mode.toLowerCase()}-item-${item.id}`}
      >
        <TimelineCard
          // Always required props
          onClick={handleItemClick}
          autoScroll={autoScroll}
          wrapperId={wrapperId}
          theme={theme}
          cardHeight={cardHeight}
          cardWidth={cardWidth}
          // Always provided props
          title={item.title}
          cardTitle={item.cardTitle}
          cardSubtitle={item.cardSubtitle}
          cardDetailedText={item.cardDetailedText}
          customContent={children ? (children as ReactNode[])[index] : null}
          iconChild={iconChildColln[index]}
          // Conditionally provided props - clean approach
          {...pickDefined({
            id: item.id,
            url: item.url,
            media: item.media,
            timelineContent: item.timelineContent,
            items: item.items,
            isNested: item.isNested,
            hasNestedItems: item.hasNestedItems,
            visible: item.visible,
            active: item.active,
            slideShowRunning: slideShowRunning,
            onElapsed: onElapsed,
            hasFocus: hasFocus,
            nestedCardHeight: nestedCardHeight,
          })}
        />
      </li>
    ));
  }, [
    items,
    itemWidth,
    handleItemClick,
    autoScroll,
    wrapperId,
    theme,
    slideShowRunning,
    cardHeight,
    onElapsed,
    children,
    hasFocus,
    iconChildren,
    cardWidth,
    isNested,
    nestedCardHeight,
  ]);

  return (
    <ul
      ref={listRef}
      className={`${timelineHorizontalWrapper} ${wrapperClass}`}
      style={{
        direction: flipLayout ? 'rtl' : 'ltr',
        position: 'relative',
      }}
      data-testid="timeline-collection"
      aria-label="Timeline"
    >
      {/* Horizontal line that runs between timeline points and titles */}
      {/* <div
        className="timeline-horizontal-connector"
        style={{
          position: 'absolute',
          top: '3.5rem', // Position between timeline points (1.5rem height + padding) and titles
          left: '5%',
          right: '5%',
          height: '2px',
          backgroundColor: theme?.primary || '#2563eb',
          opacity: 0.2,
          zIndex: 1,
        }}
      /> */}
      {timelineItems}
    </ul>
  );
};

export default TimelineHorizontal;
