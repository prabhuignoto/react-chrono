import React, { useEffect, useMemo, useRef } from 'react';
import { HorizontalCircleModel } from '../../models/TimelineHorizontalModel';
import {
  Circle,
  CircleWrapper,
} from '../timeline-elements/timeline-card/timeline-horizontal-card.styles';
import cls from 'classnames';

const HorizontalCircle: React.FunctionComponent<HorizontalCircleModel> = (
  props: HorizontalCircleModel,
) => {
  const { id, onClick, active, onActive, theme, slideShowRunning, iconChild } =
    props;
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;

      circle && onActive(circle.offsetLeft);
    }
  }, [active]);

  const circleClass = useMemo(
    () =>
      cls({
        active,
        'using-icon': !!iconChild,
      }),
    [active, iconChild],
  );

  return (
    <CircleWrapper>
      <Circle
        className={circleClass}
        onClick={(ev) => {
          ev.stopPropagation();
          if (id && onClick && !slideShowRunning) {
            onClick(id);
          }
        }}
        ref={circleRef}
        data-testid="timeline-circle"
        theme={theme}
        aria-label="select timeline"
      >
        {iconChild ? iconChild : null}
      </Circle>
    </CircleWrapper>
  );
};

export default HorizontalCircle;
