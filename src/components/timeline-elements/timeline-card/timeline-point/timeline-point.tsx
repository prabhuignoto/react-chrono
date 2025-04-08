import React from 'react';
import { Shape, ShapeWrapper } from '../timeline-horizontal-card.styles';

interface TimelinePointProps {
  circleClass: string;
  handleClick: () => void;
  circleRef: React.RefObject<HTMLDivElement>;
  title?: string;
  theme?: any;
  timelinePointDimension?: number;
  timelinePointShape?: 'circle' | 'square' | 'diamond';
  iconChild?: React.ReactNode;
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
}) => {
  return (
    <ShapeWrapper>
      <Shape
        className={circleClass}
        onClick={handleClick}
        ref={circleRef}
        data-testid="timeline-circle"
        theme={theme}
        aria-label={title}
        dimension={timelinePointDimension}
        $timelinePointShape={timelinePointShape}
      >
        {iconChild ? iconChild : null}
      </Shape>
    </ShapeWrapper>
  );
};

export default TimelinePoint;
