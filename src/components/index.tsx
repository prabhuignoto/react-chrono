import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { TimelineItemModel } from "../models/TimelineItemModel";
import { TimelineModel, TimelineProps } from "../models/TimelineModel";
import Timeline from "./timeline/timeline";

interface TimelineMainModel extends TimelineModel {
  slideShow: boolean;
}

const Chrono: React.FunctionComponent<Partial<TimelineProps>> = ({
  items,
  itemWidth = 300,
  titlePosition = "TOP",
  mode = "HORIZONTAL",
  disableNavOnScroll = false,
  disableNavOnKey = false,
  slideShow = false,
  slideItemDuration = 2500,
  theme = {
    primary: "#0f52ba",
    secondary: "#ffdf00",
  },
}) => {
  const [timeLineItems, setItems] = useState<TimelineItemModel[]>([]);
  const timeLineItemsRef = useRef<TimelineItemModel[]>();
  const timer = useRef<number>();
  const [slideshowRunning, setSlideshowRunning] = useState(false);

  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [debActvTimelineItem] = useDebounce(activeTimelineItem, 250);

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
      }, slideItemDuration);
    }
  }, [items, slideShow, titlePosition, slideItemDuration]);

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

  const handleFirst = () => {
    setActiveTimelineItem(0);
    handleTimelineUpdate(0);
  };

  const handleLast = () => {
    if (timeLineItems.length) {
      const idx = timeLineItems.length - 1;
      setActiveTimelineItem(idx);
      handleTimelineUpdate(idx);
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
      disableNavOnScroll={disableNavOnScroll}
      disableNavOnKey={disableNavOnKey}
      slideItemDuration={slideItemDuration}
      onFirst={handleFirst}
      onLast={handleLast}
      theme={theme}
    />
  );
};

export default Chrono;
