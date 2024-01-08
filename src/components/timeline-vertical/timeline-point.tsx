import { TimelinePointModel } from '@models/TimelineVerticalModel';
import cls from 'classnames';
import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { GlobalContext } from '../GlobalContext';
import { Shape } from '../timeline-elements/timeline-card/timeline-horizontal-card.styles';
import {
  TimelinePointContainer,
  TimelinePointWrapper,
} from './timeline-vertical-shape.styles';

/**
 * TimelinePoint
 * @property {string} className - The class name for the component.
 * @property {string} id - The id of the timeline point.
 * @property {() => void} onClick - Function to handle click event.
 * @property {boolean} active - Whether the timeline point is active.
 * @property {() => void} onActive - Function to handle active event.
 * @property {boolean} slideShowRunning - Whether the slideshow is running.
 * @property {React.ReactNode} iconChild - The icon child nodes.
 * @property {number} timelinePointDimension - The dimension of the timeline point.
 * @property {number} lineWidth - The width of the line.
 * @property {boolean} disableClickOnCircle - Whether the click on circle is disabled.
 * @property {boolean} cardLess - Whether the card is less.
 * @returns {JSX.Element} The TimelinePoint component.
 */
const TimelinePoint: React.FunctionComponent<TimelinePointModel> = memo(
  (props: TimelinePointModel) => {
    const {
      className,
      id,
      onClick,
      active,
      onActive,
      slideShowRunning,
      iconChild,
      timelinePointDimension,
      lineWidth,
      disableClickOnCircle,
      cardLess,
    } = props;

    const circleRef = useRef<HTMLButtonElement>(null);
    const {
      theme,
      focusActiveItemOnLoad,
      timelinePointShape,
      disableTimelinePoint,
    } = useContext(GlobalContext);

    const isFirstRender = useRef(true);

    // Determine if onActive can be invoked
    const canInvokeOnActive = useMemo(() => {
      if (focusActiveItemOnLoad) {
        return active;
      } else {
        return active && !isFirstRender.current;
      }
    }, [active]);

    // Invoke onActive if conditions are met
    useEffect(() => {
      if (canInvokeOnActive) {
        const circle = circleRef.current;

        circle && onActive(circle.offsetTop);
      }
    }, [canInvokeOnActive, active]);

    // Determine circle class
    const circleClass = useMemo(
      () =>
        cls({
          active,
          'using-icon': !!iconChild,
        }),
      [active, iconChild],
    );

    // Determine click handler props
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
      [id, onClick, slideShowRunning, disableClickOnCircle],
    );

    // Update isFirstRender flag after first render
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
    }, []);

    return (
      <TimelinePointWrapper
        width={lineWidth}
        bg={theme && theme.primary}
        className={className}
        data-testid="tree-leaf"
        $cardLess={cardLess}
      >
        {/* {!disableTimelinePoint ? ( */}
        <TimelinePointContainer
          className={`${className} timeline-vertical-circle`}
          {...clickHandlerProps}
          ref={circleRef}
          data-testid="tree-leaf-click"
          aria-label="select timeline"
          $hide={disableTimelinePoint}
        >
          <Shape
            className={circleClass}
            theme={theme}
            dimension={timelinePointDimension}
            $timelinePointShape={timelinePointShape}
          >
            {iconChild ? iconChild : null}
          </Shape>
        </TimelinePointContainer>
        {/* ) : null} */}
      </TimelinePointWrapper>
    );
  },
  (prev, next) => prev.active === next.active,
);

TimelinePoint.displayName = 'TimelinePoint';

export { TimelinePoint };
