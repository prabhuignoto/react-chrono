import React, { useContext } from 'react';
import { GlobalContext } from '../../../GlobalContext';
import { Shape, ShapeWrapper } from '../timeline-horizontal-card.styles';

interface TimelinePointProps {
  circleClass: string;
  handleClick: () => void;
  circleRef: React.RefObject<HTMLButtonElement>;
  title?: string;
  theme?: any;
  timelinePointDimension?: number;
  timelinePointShape?: 'circle' | 'square' | 'diamond';
  iconChild?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

const TimelinePoint: React.FC<TimelinePointProps> = ({
  circleClass,
  handleClick,
  circleRef,
  title,
  theme,
  timelinePointDimension,
  timelinePointShape,
  iconChild,
  active = false,
  disabled = false,
}) => {
  const { buttonTexts } = useContext(GlobalContext);

  return (
    <ShapeWrapper>
      <Shape
        as="button"
        className={circleClass}
        onClick={handleClick}
        ref={circleRef}
        data-testid="timeline-circle"
        theme={theme}
        aria-label={title ?? buttonTexts?.timelinePoint ?? 'Timeline point'}
        aria-selected={active}
        aria-disabled={disabled}
        disabled={disabled}
        dimension={timelinePointDimension}
        $timelinePointShape={timelinePointShape}
        tabIndex={disabled ? -1 : 0}
        type="button"
      >
        {iconChild ?? null}
      </Shape>
    </ShapeWrapper>
  ) as React.ReactElement;
};

export default TimelinePoint;
