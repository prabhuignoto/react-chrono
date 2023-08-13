import { TimelineHorizontalModel } from '@models/TimelineHorizontalModel';
import cls from 'classnames';
import React, { ReactNode, useContext, useMemo } from 'react';
import { GlobalContext } from '../GlobalContext';
import TimelineCard from '../timeline-elements/timeline-card/timeline-horizontal-card';
import {
  TimelineHorizontalWrapper,
  TimelineItemWrapper,
} from './timeline-horizontal.styles';

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
}: TimelineHorizontalModel) => {
  const {
    mode = 'HORIZONTAL',
    itemWidth = 200,
    cardHeight,
    flipLayout,
    showAllCardsHorizontal,
    theme,
    cardWidth,
  } = useContext(GlobalContext);

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

  const iconChildColln = React.Children.toArray(iconChildren);

  return (
    <TimelineHorizontalWrapper
      className={wrapperClass}
      flipLayout={flipLayout}
      data-testid="timeline-collection"
    >
      {items.map((item, index) => (
        <TimelineItemWrapper
          key={item.id}
          width={itemWidth}
          className={cls(
            item.visible ? 'visible' : '',
            'timeline-horz-item-container',
          )}
        >
          <TimelineCard
            {...item}
            onClick={handleItemClick}
            autoScroll={autoScroll}
            wrapperId={wrapperId}
            theme={theme}
            slideShowRunning={slideShowRunning}
            cardHeight={cardHeight}
            onElapsed={onElapsed}
            customContent={children ? (children as ReactNode[])[index] : null}
            hasFocus={hasFocus}
            iconChild={iconChildColln[index]}
            active={item.active}
            cardWidth={cardWidth}
            isNested={isNested}
            nestedCardHeight={nestedCardHeight}
          />
        </TimelineItemWrapper>
      ))}
    </TimelineHorizontalWrapper>
  );
};

export default TimelineHorizontal;
