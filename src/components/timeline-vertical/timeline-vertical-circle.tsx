import React, { useEffect, useMemo, useRef } from 'react';
import { VerticalCircleModel } from '../../models/TimelineVerticalModel';
import { Circle } from '../timeline-elements/timeline-card/timeline-horizontal-card.styles';
import {
  VerticalCircleContainer,
  VerticalCircleWrapper,
} from './timeline-vertical.styles';
import cls from 'classnames';

const VerticalCircle: React.FunctionComponent<VerticalCircleModel> = (
  props: VerticalCircleModel,
) => {
  const {
    className,
    id,
    onClick,
    active,
    onActive,
    theme,
    alternateCards,
    slideShowRunning,
    iconChild,
  } = props;
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;

      circle && onActive(circle.offsetTop);
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
    <VerticalCircleWrapper
      alternateCards={alternateCards}
      bg={theme && theme.primary}
      className={className}
      data-testid="tree-leaf"
      role="button"
    >
      <VerticalCircleContainer
        className={`${className} timeline-vertical-circle`}
        onClick={(ev) => {
          ev.stopPropagation();
          if (id && onClick && !slideShowRunning) {
            onClick(id);
          }
        }}
        ref={circleRef}
        role="button"
        data-testid="tree-leaf-click"
        aria-label="select timeline"
      >
        <Circle className={circleClass} theme={theme}>
          {iconChild ? iconChild : null}
        </Circle>
      </VerticalCircleContainer>
    </VerticalCircleWrapper>
  );
};

export default VerticalCircle;
