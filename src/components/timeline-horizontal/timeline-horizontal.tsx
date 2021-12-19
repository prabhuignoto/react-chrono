import cls from 'classnames';
import React, { ReactNode, useContext, useMemo, useCallback } from 'react';
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
  showAllCards,
  onElapsed,
  contentDetailsChildren: children,
  hasFocus,
  iconChildren,
}: TimelineHorizontalModel) => {
  const {
    mode = 'HORIZONTAL',
    itemWidth = 200,
    cardHeight,
  } = useContext(GlobalContext);
  const wrapperClass = useMemo(
    () => cls(mode.toLowerCase(), 'timeline-horz-container'),
    [mode],
  );

  const iconChildColln = React.Children.toArray(iconChildren);
  const handleOnActive = useCallback(
    (offset: number, wrapperOffset: number, width: number) => {
      autoScroll({
        pointOffset: offset,
        contentHeight: width,
        contentOffset: wrapperOffset,
      });
    },
    [],
  );

  return (
    <TimelineHorizontalWrapper
      className={wrapperClass}
      data-testid="timeline-collection"
    >
      {items.map((item, index) => (
       showAllCards || item.active || (items[index-1]? items[index-1].active : false) ||(items[index+1]? items[index+1].active :false ) ?
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
            showOnlyCircle={!showAllCards && ((items[index-1]? items[index-1].active : false) ||(items[index+1]? items[index+1].active :false ))}
            customContent={children ? (children as ReactNode[])[index] : null}
            onActive={handleOnActive}
            hasFocus={hasFocus}
            iconChild={iconChildColln[index]}
          />
        </TimelineItemWrapper>
        : null
      ))}
    </TimelineHorizontalWrapper>
  );
};

export default TimelineHorizontal;
