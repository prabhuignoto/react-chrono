import cls from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import { TimelineHorizontalModel } from '../../models/TimelineHorizontalModel';
import TimelineCard from '../timeline-elements/timeline-card/timeline-horizontal-card';
import {
  TimelineHorizontalWrapper,
  TimelineItemWrapper,
} from './timeline-horizontal.styles';

const TimelineHorizontal: React.FunctionComponent<TimelineHorizontalModel> = ({
  items,
  itemWidth,
  handleItemClick,
  autoScroll,
  mode,
  wrapperId,
  theme,
  slideShowRunning,
  cardHeight,
  slideItemDuration,
  onElapsed,
  contentDetailsChildren: children,
  hasFocus,
}: TimelineHorizontalModel) => {
  const wrapperClass = useMemo(
    () => cls(mode.toLowerCase(), 'timeline-horz-container'),
    [mode],
  );
  return (
    <TimelineHorizontalWrapper
      className={wrapperClass}
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
            mode={mode}
            wrapperId={wrapperId}
            theme={theme}
            slideShowRunning={slideShowRunning}
            cardHeight={cardHeight}
            slideItemDuration={slideItemDuration}
            onElapsed={onElapsed}
            customContent={children ? (children as ReactNode[])[index] : null}
            hasFocus={hasFocus}
          />
        </TimelineItemWrapper>
      ))}
    </TimelineHorizontalWrapper>
  );
};

export default TimelineHorizontal;
