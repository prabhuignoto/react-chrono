import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { TimelineItemModel } from "./models/TimelineItemModel";
import { TimelineModel } from "./models/TimelineModel";
import Timeline from "./timeline/timeline";

interface TimelineMainModel extends TimelineModel {
  slideShow: boolean;
}

const TimelineMain: React.FunctionComponent<Partial<TimelineMainModel>> = ({
  items,
  itemWidth = 320,
  titlePosition = "TOP",
  mode = "HORIZONTAL",
  slideShow,
}) => {
  const [timeLineItems, setItems] = useState<TimelineItemModel[]>([]);
  const timeLineItemsRef = useRef<TimelineItemModel[]>();
  const timer = useRef<number>();
  const [slideshowRunning, setSlideshowRunning] = useState(false);

  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [debActvTimelineItem] = useDebounce(activeTimelineItem, 50);

  useEffect(() => {
    if (!items) {
      return;
    }

    const newItems = items.map((item, index) => {
      return Object.assign({}, item, {
        position: titlePosition.toLowerCase(),
        id: nanoid(),
        visible: slideShow ? index === 0 : true,
        active: index === 0,
      });
    });

    setItems(newItems);

    if (slideShow) {
      timeLineItemsRef.current = newItems.slice(0);
      setSlideshowRunning(true);

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

          if (newItems) {
            timeLineItemsRef.current = newItems.slice(0);
            setItems(newItems);
          }
        } else {
          clearInterval(timer.current);
          setSlideshowRunning(false);
          setActiveTimelineItem(newItems.length - 1);
        }
      }, 500);
    }
  }, [items, slideShow, titlePosition]);

  const handleTimelineUpdate = (actvTimelineIndex: number) => {
    setItems((items) =>
      items.map((item, index) =>
        Object.assign({}, item, {
          active: index === actvTimelineIndex,
        })
      )
    );
    setActiveTimelineItem(actvTimelineIndex);
  };

  const handleOnNext = () => {
    if (!items) {
      return;
    }
    if (debActvTimelineItem < items.length - 1) {
      const newTimeLineItem = debActvTimelineItem + 1;

      handleTimelineUpdate(newTimeLineItem);
      setActiveTimelineItem(newTimeLineItem);
    }
  };

  const handleOnPrevious = () => {
    if (debActvTimelineItem > 0) {
      const newTimeLineItem = debActvTimelineItem - 1;

      handleTimelineUpdate(newTimeLineItem);
      setActiveTimelineItem(newTimeLineItem);
    }
  };

  return (
    <Timeline
      itemWidth={itemWidth}
      titlePosition={titlePosition}
      mode={mode}
      items={timeLineItems}
      onTimelineUpdated={useCallback(handleTimelineUpdate, [])}
      slideShowRunning={slideshowRunning}
      onNext={handleOnNext}
      onPrevious={handleOnPrevious}
      activeTimelineItem={debActvTimelineItem}
    />
  );
};

export default TimelineMain;
