import React, { useEffect, useRef } from "react";
import { TreeLeafModel } from "../../models/TimelineTreeModel";
import { TimelinePoint } from "../timeline-elements/timeline-card/timeline-card.styles";
import { TreeTrunkWrapper, TrunkPointWrapper } from "./timeline-tree.styles";

const TreeLeaf: React.FunctionComponent<TreeLeafModel> = (props) => {
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
    <TreeTrunkWrapper
      className={className}
      data-testid="tree-leaf"
      bg={theme?.primary}
      alternateCards={alternateCards}
    >
      <TrunkPointWrapper
        className={className}
        onClick={() => {
          if (id && onClick && !slideShowRunning) {
            onClick(id);
          }
        }}
        ref={circleRef}
        data-testid="tree-leaf-click"
      >
        <TimelinePoint
          className={active ? "active" : "in-active"}
          theme={theme}
        />
      </TrunkPointWrapper>
    </TreeTrunkWrapper>
  );
};

export default TreeLeaf;
