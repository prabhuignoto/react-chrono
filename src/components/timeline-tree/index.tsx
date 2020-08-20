import React, { useEffect, useRef } from "react";
import { Scroll } from "../models/TimelineCollnModel";
import { TimelineItemViewModel } from "../models/TimelineItemModel";
import TimelineItemContent from "../timeline-item-content";
import TimelineItemTitle from "../timeline-item-title";
import { Circle } from "../timeline-item/timeline-item.styles";
import {
  Branch,
  TimelineItemContentWrapper,
  TimelineTreeTitleWrapper,
  TimelineTreeWrapper,
  TreeTrunkWrapper,
  TrunkCircleWrapper,
} from "./timeline-tree.styles";

interface TreeTrunkModel {
  className: string;
  id?: string;
  active: boolean;
  onClick: (id: string) => void;
  onActive: (circleOffset: number) => void;
}

interface TreeBranchModel {
  className: string;
  index: number;
  contentText: string;
  active: boolean;
  id?: string;
  onClick: (id: string) => void;
  onActive: (
    circleOffset: number,
    contentHeight: number,
    contentOffset: number
  ) => void;
  title: string;
}

const TreeTrunk: React.FunctionComponent<TreeTrunkModel> = ({
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
      {/* <Line className={className} /> */}
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
        <TimelineItemContent content={contentText} />
      </TimelineItemContentWrapper>
      <TreeTrunk
        className={className}
        id={id}
        active={active}
        onClick={onClick}
        onActive={handleOnActive}
      />
    </Branch>
  );
};

const TimelineTree: React.FunctionComponent<{
  items: TimelineItemViewModel[];
  onClick: (id?: string) => void;
  activeTimelineItem: number;
  onScroll: (s: Scroll) => void;
}> = ({ items, onClick, activeTimelineItem, onScroll }) => {
  useEffect(() => {}, [activeTimelineItem]);

  const handleOnActive = (
    offset: number,
    wrapperOffset: number,
    height: number
  ) => {
    onScroll({
      circleOffset: offset,
      contentHeight: height,
      contentOffset: wrapperOffset,
    });
  };

  return (
    <TimelineTreeWrapper>
      {items.map((item, index) => {
        let className = index % 2 === 0 ? "left" : "right";
        return (
          <TreeBranch
            className={className}
            id={item.id}
            index={index}
            onClick={onClick}
            contentText={item.contentText}
            active={activeTimelineItem === index}
            onActive={handleOnActive}
            key={item.id}
            title={item.title}
          />
        );
      })}
      {/* <Trunk /> */}
    </TimelineTreeWrapper>
  );
};

export default TimelineTree;
