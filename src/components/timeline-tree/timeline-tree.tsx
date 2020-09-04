import React from "react";
import { TimelineTreeModel } from "../../models/TimelineTreeModel";
import TreeBranch from "./timeline-tree-branch";
import { TimelineTreeWrapper } from "./timeline-tree.styles";

const TimelineTree: React.FunctionComponent<TimelineTreeModel> = ({
  items,
  onClick,
  autoScroll,
  theme,
  alternateCards = true,
  slideShowRunning
}) => {
  const handleOnActive = (
    offset: number,
    wrapperOffset: number,
    height: number
  ) => {
    autoScroll({
      timelinePointOffset: offset,
      timelineContentHeight: height,
      timelineContentOffset: wrapperOffset,
    });
  };

  const handleOnShowMore = () => {};

  return (
    <TimelineTreeWrapper data-testid="tree-main">
      {items.map((item, index) => {
        let className = "";

        if (alternateCards) {
          className = index % 2 === 0 ? "left" : "right";
        } else {
          className = "right";
        }

        return (
          <TreeBranch
            className={className}
            id={item.id}
            index={index}
            onClick={onClick}
            contentText={item.contentText}
            active={item.active}
            onActive={handleOnActive}
            key={item.id}
            title={item.title}
            visible={item.visible}
            contentTitle={item.contentTitle}
            contentDetailedText={item.contentDetailedText}
            theme={theme}
            onShowMore={handleOnShowMore}
            alternateCards={alternateCards}
            slideShowRunning={slideShowRunning}
          />
        );
      })}
    </TimelineTreeWrapper>
  );
};

export default TimelineTree;
