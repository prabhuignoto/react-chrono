import React, { useCallback } from "react";
import { TimelineTreeModel } from "../../models/TimelineTreeModel";
import TreeBranch from "./timeline-tree-branch";
import { TimelineTreeWrapper } from "./timeline-tree.styles";

// This component is used to render both tree and vertical modes
const TimelineTree: React.FunctionComponent<TimelineTreeModel> = ({
  items,
  onClick,
  autoScroll,
  theme,
  alternateCards = true,
  slideShowRunning,
  mode,
  cardHeight,
  slideItemDuration,
  onElapsed
}) => {
  // check if the timeline that has become active is visible.
  // if not auto scroll the content and bring it to the view.
  const handleOnActive = useCallback(
    (offset: number, wrapperOffset: number, height: number) => {
      autoScroll({
        timelinePointOffset: offset,
        timelineContentHeight: height,
        timelineContentOffset: wrapperOffset,
      });
    },
    [autoScroll]
  );

  // todo remove this
  const handleOnShowMore = useCallback(() => {}, []);

  return (
    <TimelineTreeWrapper data-testid="tree-main">
      {items.map((item, index) => {
        let className = "";

        // in tree mode alternate cards position
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
            media={item.media}
            mode={mode}
            cardHeight={cardHeight}
            slideItemDuration={slideItemDuration}
            onElapsed={onElapsed}
          />
        );
      })}
    </TimelineTreeWrapper>
  );
};

export default TimelineTree;
