import React, { useCallback } from 'react';
import { TimelineVerticalModel } from '../../models/TimelineVerticalModel';
import TimelineVerticalItem from './timeline-vertical-item';
import { TimelineVerticalWrapper } from './timeline-vertical.styles';

// This component is used to render both tree and vertical modes
const TimelineVertical: React.FunctionComponent<TimelineVerticalModel> = ({
  items,
  onClick,
  autoScroll,
  theme,
  alternateCards = true,
  slideShowRunning,
  mode,
  cardHeight,
  slideItemDuration,
  onElapsed,
  contentDetailsChildren,
  hasFocus,
  flipLayout,
}: TimelineVerticalModel) => {
  // check if the timeline that has become active is visible.
  // if not auto scroll the content and bring it to the view.
  const handleOnActive = useCallback(
    (offset: number, wrapperOffset: number, height: number) => {
      autoScroll({
        timelinePointOffset: offset,
        timelineContentHeight: height,
        timelineContentOffset: wrapperOffset,
      });
    },
    [],
  );

  // todo remove this
  const handleOnShowMore = useCallback(() => {}, []);

  return (
    <TimelineVerticalWrapper data-testid="tree-main" role="list">
      {items.map((item, index) => {
        let className = '';

        // in tree mode alternate cards position
        if (alternateCards) {
          className = index % 2 === 0 ? 'left' : 'right';
        } else {
          className = 'right';
        }

        const contentDetails =
          (contentDetailsChildren &&
            (contentDetailsChildren as React.ReactNode[])[index]) ||
          null;

        return (
          <TimelineVerticalItem
            {...item}
            className={className}
            index={index}
            key={item.id}
            theme={theme}
            alternateCards={alternateCards}
            slideShowRunning={slideShowRunning}
            mode={mode}
            cardHeight={cardHeight}
            slideItemDuration={slideItemDuration}
            onShowMore={handleOnShowMore}
            onActive={handleOnActive}
            onClick={onClick}
            onElapsed={onElapsed}
            contentDetailsChildren={contentDetails}
            hasFocus={hasFocus}
            flipLayout={flipLayout}
          />
        );
      })}
    </TimelineVerticalWrapper>
  );
};

export default TimelineVertical;
