import React, { useEffect, useRef } from 'react';
import { TreeLeafModel } from '../../models/TimelineTreeModel';
import { Circle } from '../timeline-elements/timeline-card/timeline-card.styles';
import {
  VerticalCircleWrapper,
  VerticalCircleContainer,
} from './timeline-vertical.styles';

const VerticalCircle: React.FunctionComponent<TreeLeafModel> = (
  props: TreeLeafModel,
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
  } = props;
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;

      circle && onActive(circle.offsetTop);
    }
  }, [active, onActive]);

  return (
    <VerticalCircleWrapper
      className={className}
      data-testid="tree-leaf"
      bg={theme && theme.primary}
      alternateCards={alternateCards}
      role="button"
    >
      <VerticalCircleContainer
        className={className}
        onClick={() => {
          if (id && onClick && !slideShowRunning) {
            onClick(id);
          }
        }}
        ref={circleRef}
        role="button"
        data-testid="tree-leaf-click"
        aria-label="select timeline"
      >
        <Circle className={active ? 'active' : 'in-active'} theme={theme} />
      </VerticalCircleContainer>
    </VerticalCircleWrapper>
  );
};

export default VerticalCircle;
