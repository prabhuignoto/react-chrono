import React from 'react';
import { TimelineHorizontalModel } from '../../models/TimelineHorizontalModel';
import TimelineCard from '../timeline-elements/timeline-card/timeline-card';
import {
  TimelineHorizontalWrapper,
  TimelineItemWrapper,
} from './timeline-horizontal.styles';

const TimelineCollection: React.FunctionComponent<TimelineHorizontalModel> = ({
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
}: TimelineHorizontalModel) => {
  return (
    <TimelineHorizontalWrapper
      className={`${mode.toLowerCase()} timeline-horz-container`}
      data-testid="timeline-collection"
    >
      {items.map((item) => (
        <TimelineItemWrapper
          key={item.id}
          width={itemWidth}
          className={`${
            item.visible ? 'visible' : ''
          } timeline-horz-item-container`}
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
          />
        </TimelineItemWrapper>
      ))}
    </TimelineHorizontalWrapper>
  );
};

export default TimelineCollection;
