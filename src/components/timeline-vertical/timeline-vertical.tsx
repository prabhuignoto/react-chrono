import React, { useCallback } from 'react';
import { TimelineVerticalModel } from '../../models/TimelineVerticalModel';
import TimelineVerticalItem from './timeline-vertical-item';
import { TimelineVerticalWrapper } from './timeline-vertical.styles';

// This component is used to render both tree and vertical modes
const TimelineVertical: React.FunctionComponent<TimelineVerticalModel> = ({
  alternateCards = true,
  autoScroll,
  contentDetailsChildren,
  hasFocus,
  iconChildren,
  items,
  onClick,
  onElapsed,
  slideShowRunning,
  theme,
}: TimelineVerticalModel) => {
  // check if the timeline that has become active is visible.
  // if not auto scroll the content and bring it to the view.
  const handleOnActive = useCallback(
    (offset: number, wrapperOffset: number, height: number) => {
      autoScroll({
        pointOffset: offset,
        contentHeight: height,
        contentOffset: wrapperOffset,
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
        const customIcon =
          (iconChildren && (iconChildren as React.ReactNode[])[index]) || null;

        return (
          <TimelineVerticalItem
            {...item}
            alternateCards={alternateCards}
            className={className}
            contentDetailsChildren={contentDetails}
            iconChild={customIcon}
            hasFocus={hasFocus}
            index={index}
            key={item.id}
            onActive={handleOnActive}
            onClick={onClick}
            onElapsed={onElapsed}
            onShowMore={handleOnShowMore}
            slideShowRunning={slideShowRunning}
            theme={theme}
          />
        );
      })}
    </TimelineVerticalWrapper>
  );
};

export default TimelineVertical;
