import React, { useRef } from "react";
import { TreeBranchModel } from "../../models/TimelineTreeModel";
import TimelineCard from "../timeline-elements/timeline-card-content/timeline-card-content";
import TimelineItemTitle from "../timeline-elements/timeline-item-title/timeline-card-title";
import TreeLeaf from "./timeline-tree-leaf";
import {
  Branch,
  TimelineCardContentWrapper,
  TimelineTreeTitleWrapper,
} from "./timeline-tree.styles";

const TreeBranch: React.FunctionComponent<TreeBranchModel> = (props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    active,
    alternateCards,
    cardHeight,
    className,
    contentDetailedText,
    contentText,
    contentTitle,
    id,
    index,
    media,
    mode,
    onActive,
    onClick,
    slideItemDuration,
    slideShowRunning,
    theme,
    title,
    visible,
    onElapsed,
  } = props;

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
      <TimelineCardContentWrapper
        className={`${className} ${visible ? "visible" : ""}`}
        alternateCards={alternateCards}
      >
        <TimelineCard
          active={active}
          cardHeight={cardHeight}
          content={contentText}
          detailedText={contentDetailedText}
          id={id}
          media={media}
          mode={mode}
          onClick={onClick}
          slideShowActive={slideShowRunning}
          theme={theme}
          title={contentTitle}
          onShowMore={() =>
            setTimeout(() => {
              handleOnActive(0);
            }, 200)
          }
          branchDir={className}
          slideItemDuration={slideItemDuration}
          onElapsed={onElapsed || function () {}}
        />
      </TimelineCardContentWrapper>

      {/* leaf */}
      <TreeLeaf
        className={className}
        id={id}
        active={active}
        onClick={onClick}
        onActive={handleOnActive}
        theme={theme}
        alternateCards={alternateCards}
        slideShowRunning={slideShowRunning}
      />
    </Branch>
  );
};

export default TreeBranch;
