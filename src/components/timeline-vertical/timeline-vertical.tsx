import React, { useCallback } from 'react';
import { TimelineTreeModel } from '../../models/TimelineTreeModel';
import TreeBranch from './timeline-vertical-item';
import { TimelineVerticalWrapper } from './timeline-vertical.styles';

// This component is used to render both tree and vertical modes
const TimelineTree: React.FunctionComponent<TimelineTreeModel> = ({
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
}: TimelineTreeModel) => {
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
    [autoScroll],
  );

  // todo remove this
  const handleOnShowMore = useCallback(() => {}, []);

  return (
    <TimelineVerticalWrapper data-testid="tree-main" role="list" tabIndex={0}>
      {items.map((item, index) => {
        let className = '';

        // in tree mode alternate cards position
        if (alternateCards) {
          className = index % 2 === 0 ? 'left' : 'right';
        } else {
          className = 'right';
        }

        return (
          <TreeBranch
            className={className}
            id={item.id}
            index={index}
            onClick={onClick}
            cardSubtitle={item.cardSubtitle}
            active={item.active}
            onActive={handleOnActive}
            key={item.id}
            title={item.title}
            visible={item.visible}
            cardTitle={item.cardTitle}
            cardDetailedText={item.cardDetailedText}
            theme={theme}
            onShowMore={handleOnShowMore}
            alternateCards={alternateCards}
            slideShowRunning={slideShowRunning}
            media={item.media}
            mode={mode}
            cardHeight={cardHeight}
            slideItemDuration={slideItemDuration}
            onElapsed={onElapsed}
          />
        );
      })}
    </TimelineVerticalWrapper>
  );
};

export default TimelineTree;
