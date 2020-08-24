import React from "react";
import { Scroll } from "../models/TimelineCollnModel";
import { TimelineItemViewModel } from "../models/TimelineItemModel";
import TreeBranch from "./timeline-tree-branch";
import { TimelineTreeWrapper } from "./timeline-tree.styles";

const TimelineTree: React.FunctionComponent<{
  items: TimelineItemViewModel[];
  onClick: (id?: string) => void;
  activeTimelineItem: number;
  autoScroll: (s: Partial<Scroll>) => void;
}> = ({ items, onClick, activeTimelineItem, autoScroll }) => {
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

  return (
    <TimelineTreeWrapper data-testid="tree-main">
      {items.map((item, index) => {
        let className = index % 2 === 0 ? "left" : "right";
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
          />
        );
      })}
      {/* <Trunk /> */}
    </TimelineTreeWrapper>
  );
};

export default TimelineTree;
