import cls from 'classnames';
import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { VerticalPointModel } from '../../models/TimelineVerticalModel';
import { GlobalContext } from '../GlobalContext';
import { Shape } from '../timeline-elements/timeline-card/timeline-horizontal-card.styles';
import {
  VerticalPointContainer,
  VerticalPointWrapper,
} from './timeline-vertical-shape.styles';

const VerticalPoint: React.FunctionComponent<VerticalPointModel> = memo(
  (props: VerticalPointModel) => {
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
    const { theme, focusActiveItemOnLoad, timelinePointShape } =
      useContext(GlobalContext);

    const isFirstRender = useRef(true);
    const canInvokeOnActive = useMemo(() => {
      if (focusActiveItemOnLoad) {
        return active;
      } else {
        return active && !isFirstRender.current;
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
      <VerticalPointWrapper
        width={lineWidth}
        alternateCards={alternateCards}
        bg={theme && theme.primary}
        className={className}
        data-testid="tree-leaf"
        role="button"
        cardLess={cardLess}
      >
        <VerticalPointContainer
          className={`${className} timeline-vertical-circle`}
          {...clickHandlerProps}
          ref={circleRef}
          role="button"
          data-testid="tree-leaf-click"
          aria-label="select timeline"
        >
          <Shape
            className={circleClass}
            theme={theme}
            dimension={timelineCircleDimension}
            timelinePointShape={timelinePointShape}
          >
            {iconChild ? iconChild : null}
          </Shape>
        </VerticalPointContainer>
      </VerticalPointWrapper>
    );
  },
  (prev, next) => prev.active === next.active,
);

VerticalPoint.displayName = 'VerticalPoint';

export { VerticalPoint };
