import React from "react";
import TimelineItem from "../timeline-item";
import { TimelineCollectionModel } from "./../models/TimelineCollnModel";
import {
  TimelineCollectionWrapper,
  TimelineItemWrapper,
} from "./timeline-collection.styles";

const TimelineCollection: React.FunctionComponent<TimelineCollectionModel> = ({
  items,
  itemWidth,
  handleItemClick,
  onScroll,
  mode
}) => {
  return (
    <TimelineCollectionWrapper className={mode.toLowerCase()}>
      {items.map((item) => (
        <TimelineItemWrapper
          key={item.id}
          width={itemWidth}
          className={mode.toLowerCase()}
        >
          <TimelineItem
            {...item}
            onClick={handleItemClick}
            scroll={onScroll}
            mode={mode}
          />
          {/* <Connector /> */}
        </TimelineItemWrapper>
      ))}
    </TimelineCollectionWrapper>
  );
};

export default TimelineCollection;
