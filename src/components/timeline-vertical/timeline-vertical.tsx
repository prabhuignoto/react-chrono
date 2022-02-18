import React, { useCallback, useMemo } from 'react';
import { TimelineVerticalModel } from '../../models/TimelineVerticalModel';
import { TimelineOutline } from '../timeline-elements/timeline-outline/timeline-outline';
import TimelineVerticalItem from './timeline-vertical-item';
import { TimelineVerticalWrapper } from './timeline-vertical.styles';

// This component is used to render both tree and vertical modes
const TimelineVertical: React.FunctionComponent<TimelineVerticalModel> = ({
  alternateCards = true,
  autoScroll,
  contentDetailsChildren,
  enableOutline,
  hasFocus,
  iconChildren,
  items,
  mode,
  onClick,
  onElapsed,
  onOutlineSelection,
  slideShowRunning,
  theme,
  cardLess,
}: TimelineVerticalModel) => {
  // check if the timeline that has become active is visible.
  // if not auto scroll the content and bring it to the view.
  const handleOnActive = useCallback(
    (offset: number, wrapperOffset: number, height: number) => {
      autoScroll({
        contentHeight: height,
        contentOffset: wrapperOffset,
        pointOffset: offset,
      });
    },
    [],
  );

  // todo remove this
  const handleOnShowMore = useCallback(() => {}, []);

  const outlineItems = useMemo(
    () =>
      items.map((item) => ({
        id: Math.random().toString(16).slice(2),
        name: item.title,
      })),
    [items.length],
  );

  return (
    <TimelineVerticalWrapper data-testid="tree-main" role="list">
      {enableOutline && (
        <TimelineOutline
          theme={theme}
          mode={mode}
          items={outlineItems}
          onSelect={onOutlineSelection}
        />
      )}
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
            cardLess={cardLess}
          />
        );
      })}
    </TimelineVerticalWrapper>
  );
};

export default TimelineVertical;
