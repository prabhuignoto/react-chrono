import React, { useEffect, useRef } from "react";
import { TreeLeafModel } from "../../models/TimelineTreeModel";
import { TimelinePoint } from "../timeline-item/timeline-item.styles";
import { TreeTrunkWrapper, TrunkPointWrapper } from "./timeline-tree.styles";

const TreeLeaf: React.FunctionComponent<TreeLeafModel> = ({
  className,
  id,
  onClick,
  active,
  onActive,
  theme,
  alternateCards
}) => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;

      circle && onActive(circle.offsetTop);
    }
  }, [active, onActive]);

  return (
    <TreeTrunkWrapper
      className={className}
      data-testid="tree-leaf"
      bg={theme?.primary}
      alternateCards={alternateCards}
    >
      <TrunkPointWrapper
        className={className}
        onClick={() => id && onClick(id)}
        ref={circleRef}
        data-testid="tree-leaf-click"
      >
        <TimelinePoint className={active ? "active" : "in-active"} theme={theme}/>
      </TrunkPointWrapper>
    </TreeTrunkWrapper>
  );
};

export default TreeLeaf;
