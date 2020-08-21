import React, { useRef } from "react";
import TimelineItemContent from "../timeline-item-content";
import { TimelineItemContentWrapper } from "./timeline-tree.styles";
import TimelineItemTitle from "../timeline-item-title";
import { Branch, TimelineTreeTitleWrapper } from "./timeline-tree.styles";
import TreeLeaf from "./timeline-tree-leaf";
import { TreeBranchModel } from "../models/TimelineTreeModel";

const TreeBranch: React.FunctionComponent<TreeBranchModel> = ({
  className,
  index,
  contentText,
  id,
  active,
  onClick,
  onActive,
  title,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOnActive = (offset: number) => {
    if (contentRef.current) {
      const { offsetTop, clientHeight } = contentRef.current;
      onActive(offsetTop + offset, offsetTop, clientHeight);
    }
  };

  return (
    <Branch className={className} key={index} ref={contentRef}>
      <TimelineTreeTitleWrapper className={className}>
        <TimelineItemTitle title={title} active={active} />
      </TimelineTreeTitleWrapper>
      <TimelineItemContentWrapper className={className}>
        <TimelineItemContent content={contentText} active={active} />
      </TimelineItemContentWrapper>
      <TreeLeaf
        className={className}
        id={id}
        active={active}
        onClick={onClick}
        onActive={handleOnActive}
      />
    </Branch>
  );
};

export default TreeBranch;
