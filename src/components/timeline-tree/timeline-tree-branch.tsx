import React, { useRef } from "react";
import { TreeBranchModel } from "../../models/TimelineTreeModel";
import TimelineItemContent from "../timeline-elements/timeline-item-content/timeline-item-content";
import TimelineItemTitle from "../timeline-elements/timeline-item-title/timeline-item-title";
import TreeLeaf from "./timeline-tree-leaf";
import {
  Branch,
  TimelineItemContentWrapper,
  TimelineTreeTitleWrapper,
} from "./timeline-tree.styles";

const TreeBranch: React.FunctionComponent<TreeBranchModel> = ({
  active,
  alternateCards,
  className,
  contentDetailedText,
  contentText,
  contentTitle,
  id,
  index,
  onActive,
  onClick,
  theme,
  title,
  visible,
  slideShowRunning,
  media,
  mode,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOnActive = (offset: number) => {
    if (contentRef.current) {
      const { offsetTop, clientHeight } = contentRef.current;
      onActive(offsetTop + offset, offsetTop, clientHeight);
    }
  };

  return (
    <Branch
      className={`${className} ${visible ? "visible" : ""} branch-main`}
      key={index}
      ref={contentRef}
      data-testid="branch-main"
      alternateCards={alternateCards}
    >
      {/* title */}
      <TimelineTreeTitleWrapper
        className={className}
        alternateCards={alternateCards}
      >
        <TimelineItemTitle title={title} active={active} theme={theme} />
      </TimelineTreeTitleWrapper>

      {/* content section */}
      <TimelineItemContentWrapper
        className={`${className} ${visible ? "visible" : ""}`}
        alternateCards={alternateCards}
      >
        <TimelineItemContent
          content={contentText}
          active={active}
          title={contentTitle}
          detailedText={contentDetailedText}
          onShowMore={() =>
            setTimeout(() => {
              handleOnActive(0);
            }, 200)
          }
          theme={theme}
          slideShowActive={slideShowRunning}
          media={media}
          mode={mode}
        />
      </TimelineItemContentWrapper>

      {/* leaf */}
      <TreeLeaf
        className={className}
        id={id}
        active={active}
        onClick={onClick}
        onActive={handleOnActive}
        theme={theme}
        alternateCards={alternateCards}
      />
    </Branch>
  );
};

export default TreeBranch;
