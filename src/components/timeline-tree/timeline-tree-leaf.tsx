import React, { useEffect, useRef } from "react";
import { TreeLeafModel } from "../models/TimelineTreeModel";
import { Circle } from "../timeline-item/timeline-item.styles";
import { TreeTrunkWrapper, TrunkCircleWrapper } from "./timeline-tree.styles";

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
    <TreeTrunkWrapper className={className} data-testid="tree-leaf">
      <TrunkCircleWrapper
        className={className}
        onClick={() => id && onClick(id)}
        ref={circleRef}
        data-testid="tree-leaf-click"
      >
        <Circle className={active ? "active" : "in-active"} />
      </TrunkCircleWrapper>
    </TreeTrunkWrapper>
  );
};

export default TreeLeaf;
