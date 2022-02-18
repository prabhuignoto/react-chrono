import cls from 'classnames';
import React, { useEffect, useMemo, useRef } from 'react';
import { VerticalCircleModel } from '../../models/TimelineVerticalModel';
import { Circle } from '../timeline-elements/timeline-card/timeline-horizontal-card.styles';
import {
  VerticalCircleContainer,
  VerticalCircleWrapper,
} from './timeline-vertical.styles';

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
    timelineCircleDimension,
    lineWidth,
    disableClickOnCircle,
    cardLess,
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

  const clickHandlerProps = useMemo(
    () =>
      !disableClickOnCircle && {
        onClick: (ev: React.MouseEvent) => {
          ev.stopPropagation();
          if (id && onClick && !slideShowRunning) {
            onClick(id);
          }
        },
      },
    [],
  );

  return (
    <VerticalCircleWrapper
      width={lineWidth}
      alternateCards={alternateCards}
      bg={theme && theme.primary}
      className={className}
      data-testid="tree-leaf"
      role="button"
      cardLess={cardLess}
    >
      <VerticalCircleContainer
        className={`${className} timeline-vertical-circle`}
        {...clickHandlerProps}
        ref={circleRef}
        role="button"
        data-testid="tree-leaf-click"
        aria-label="select timeline"
      >
        <Circle
          className={circleClass}
          theme={theme}
          dimension={timelineCircleDimension}
        >
          {iconChild ? iconChild : null}
        </Circle>
      </VerticalCircleContainer>
    </VerticalCircleWrapper>
  );
};

export default VerticalCircle;
