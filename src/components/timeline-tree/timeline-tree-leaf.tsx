import React, { useRef, useEffect } from 'react'
import { TreeTrunkWrapper, TrunkCircleWrapper } from './timeline-tree.styles';
import { Circle } from '../timeline-item/timeline-item.styles';
import { TreeLeafModel } from '../models/TimelineTreeModel';

const TreeLeaf: React.FunctionComponent<TreeLeafModel> = ({
  className,
  id,
  onClick,
  active,
  onActive,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;

      circle && onActive(circle?.offsetTop);
    }
  }, [active, onActive]);

  return (
    <TreeTrunkWrapper className={className}>
      <TrunkCircleWrapper
        className={className}
        onClick={() => id && onClick(id)}
        ref={circleRef}
      >
        <Circle className={active ? "active" : "in-active"} />
      </TrunkCircleWrapper>
    </TreeTrunkWrapper>
  );
};

export default TreeLeaf;