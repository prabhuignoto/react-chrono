import cls from 'classnames';
import React, { ReactNode, useContext, useMemo } from 'react';
import { TimelineHorizontalModel } from '../../models/TimelineHorizontalModel';
import { GlobalContext } from '../GlobalContext';
import TimelineCard from '../timeline-elements/timeline-card/timeline-horizontal-card';
import {
  TimelineHorizontalWrapper,
  TimelineItemWrapper,
} from './timeline-horizontal.styles';

const TimelineHorizontal: React.FunctionComponent<TimelineHorizontalModel> = ({
  items,
  handleItemClick,
  autoScroll,
  wrapperId,
  theme,
  slideShowRunning,
  onElapsed,
  contentDetailsChildren: children,
  hasFocus,
  iconChildren,
}: TimelineHorizontalModel) => {
  const { mode = 'HORIZONTAL', itemWidth = 200, cardHeight } = useContext(
    GlobalContext,
  );
  const wrapperClass = useMemo(
    () => cls(mode.toLowerCase(), 'timeline-horz-container'),
    [mode],
  );

  const iconChildColln = React.Children.toArray(iconChildren);

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
            onElapsed={onElapsed}
            customContent={children ? (children as ReactNode[])[index] : null}
            hasFocus={hasFocus}
            iconChild={iconChildColln[index]}
          />
        </TimelineItemWrapper>
      ))}
    </TimelineHorizontalWrapper>
  );
};

export default TimelineHorizontal;
