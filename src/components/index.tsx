import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { TimelineItemModel } from "./models/TimelineItemModel";
import { TimelineModel } from "./models/TimelineModel";
import Timeline from "./timeline";

interface TimelineMainModel extends TimelineModel {
  slideShow: boolean;
}

const TimelineMain: React.FunctionComponent<TimelineMainModel> = ({
  items,
  itemWidth = 320,
  titlePosition = "TOP",
  mode = "HORIZONTAL",
  slideShow,
}) => {
  const [timeLineItems, setItems] = useState<TimelineItemModel[]>([]);
  const timeLineItemsRef = useRef<TimelineItemModel[]>();
  const timer = useRef<number>();

  useEffect(() => {
    const newItems = items.map((item, index) => {
      return Object.assign({}, item, {
        position: titlePosition.toLowerCase(),
        id: nanoid(),
        visible: slideShow ? index === 0 : true,
        active: index === 0
      });
    });
    setItems(newItems);

    if (slideShow) {
      timeLineItemsRef.current = newItems.slice(0);

      timer.current = setInterval(() => {
        const invisibleElements = timeLineItemsRef.current?.filter(
          (item) => !item.visible
        );

        if (invisibleElements && invisibleElements.length) {
          const itemToShow = invisibleElements[0];

          const newItems = timeLineItemsRef.current?.map((item) =>
            Object.assign({}, item, {
              visible: !item.visible ? itemToShow.id === item.id : true,
              active: itemToShow.id === item.id,
            })
          );

          if(newItems) {
            timeLineItemsRef.current = newItems.slice(0);
            setItems(newItems);
          }
        } else {
          clearInterval(timer.current);
        }
      }, 2000);
    }
  }, []);

  const handleTimelineUpdate = (actvTimelineIndex: number) => {
    setItems((items) =>
      items.map((item, index) =>
        Object.assign({}, item, {
          active: index === actvTimelineIndex,
        })
      )
    );
  };

  return (
    <Timeline
      itemWidth={itemWidth}
      titlePosition={titlePosition}
      mode={mode}
      items={timeLineItems}
      onTimelineUpdated={handleTimelineUpdate}
    />
  );
};

export default TimelineMain;
