import cls from 'classnames';
import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { VerticalCircleModel } from '../../models/TimelineVerticalModel';
import { GlobalContext } from '../GlobalContext';
import { Circle } from '../timeline-elements/timeline-card/timeline-horizontal-card.styles';
import {
  VerticalCircleContainer,
  VerticalCircleWrapper,
} from './timeline-vertical.styles';

const VerticalCircle: React.FunctionComponent<VerticalCircleModel> = memo(
  (props: VerticalCircleModel) => {
    const {
      className,
      id,
      onClick,
      active,
      onActive,
      alternateCards,
      slideShowRunning,
      iconChild,
      timelineCircleDimension,
      lineWidth,
      disableClickOnCircle,
      cardLess,
    } = props;
    const circleRef = useRef<HTMLDivElement>(null);
    const { theme, focusActiveItemOnLoad } = useContext(GlobalContext);

    const isFirstRender = useRef(true);
    const canInvokeOnActive = useMemo(() => {
      if (focusActiveItemOnLoad) {
        return active;
      } else {
        return active && isFirstRender.current;
      }
    }, [active]);

    useEffect(() => {
      if (canInvokeOnActive) {
        const circle = circleRef.current;

        circle && onActive(circle.offsetTop);
      }
    }, [canInvokeOnActive, active]);

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

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
    }, []);

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
  },
  (prev, next) => prev.active === next.active,
);

VerticalCircle.displayName = 'VerticalCircle';

export default VerticalCircle;
