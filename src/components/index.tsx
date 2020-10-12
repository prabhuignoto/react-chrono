import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TimelineItemModel } from "../models/TimelineItemModel";
import { TimelineProps } from "../models/TimelineModel";
import Timeline from "./timeline/timeline";

const Chrono: React.FunctionComponent<Partial<TimelineProps>> = ({
  items,
  itemWidth = 300,
  titlePosition = "TOP",
  mode = "HORIZONTAL",
  disableNavOnKey = false,
  slideShow = false,
  slideItemDuration = 5000,
  theme = {
    primary: "#0f52ba",
    secondary: "#ffdf00",
  },
  cardHeight = 250,
}) => {
  const [timeLineItems, setItems] = useState<TimelineItemModel[]>([]);
  const timeLineItemsRef = useRef<TimelineItemModel[]>();
  const timer = useRef<number>();
  const [slideShowActive, setSlideshowActive] = useState(false);

  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const activeMediaState = useRef<{ playing: boolean; paused: boolean }>();

  const initItems = () =>
    items
      ? items.map((item, index) => {
          return Object.assign({}, item, {
            position: titlePosition.toLowerCase(),
            id: nanoid(),
            visible: slideShow ? index === 0 : true,
            active: index === 0,
          });
        })
      : [];

  // setup the slideshow
  const setupSlideShow = () => {
    if (!items || !items.length) {
      return;
    }

    const newItems = !timeLineItems.length
      ? initItems()
      : timeLineItems.map((item) =>
          Object.assign({}, item, {
            visible: false,
          })
        );

    timeLineItemsRef.current = newItems.slice(0);

    if (timer.current) {
      window.clearInterval(timer.current);
    }

    const runShow = () => {
      const invisibleElements = timeLineItemsRef.current?.filter(
        (item) => !item.visible
      );

      if (activeMediaState.current && activeMediaState.current.playing) {
        return;
      }

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
        setSlideshowActive(false);
        setActiveTimelineItem(newItems.length - 1);
      }
    };
    runShow();
    timer.current = window.setInterval(runShow, slideItemDuration);
  };

  useEffect(() => {
    if (!items) {
      return;
    }

    if (slideShowActive && slideShow) {
      setupSlideShow();
    }
    // eslint-disable-next-line
  }, [slideShowActive]);

  useEffect(() => {
    if (slideShow) {
      // setupSlideShow();
    } else {
    }
    const items = initItems();
    timeLineItemsRef.current = items;
    setItems(items);
    // eslint-disable-next-line
  }, []);

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

  const restartSlideShow = () => {
    setSlideshowActive(true);
  };

  const handleOnNext = () => {
    if (!items) {
      return;
    }
    if (activeTimelineItem < items.length - 1) {
      const newTimeLineItem = activeTimelineItem + 1;

      handleTimelineUpdate(newTimeLineItem);
      setActiveTimelineItem(newTimeLineItem);
    }
  };

  const handleOnPrevious = () => {
    if (activeTimelineItem > 0) {
      const newTimeLineItem = activeTimelineItem - 1;

      handleTimelineUpdate(newTimeLineItem);
      setActiveTimelineItem(newTimeLineItem);
    }
  };

  const handleFirst = () => {
    setActiveTimelineItem(0);
    handleTimelineUpdate(0);
  };

  const handleActiveMedia = (data: any) => {
    activeMediaState.current = data;
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
      activeTimelineItem={activeTimelineItem}
      disableNavOnKey={disableNavOnKey}
      itemWidth={itemWidth}
      items={timeLineItems}
      mode={mode}
      onFirst={handleFirst}
      onLast={handleLast}
      onNext={handleOnNext}
      onPrevious={handleOnPrevious}
      onRestartSlideshow={restartSlideShow}
      onTimelineUpdated={useCallback(handleTimelineUpdate, [])}
      slideItemDuration={slideItemDuration}
      slideShowRunning={slideShowActive}
      slideShowEnabled={slideShow}
      theme={theme}
      titlePosition={titlePosition}
      slideShow={slideShow}
      cardHeight={cardHeight}
      onMediaStateChange={handleActiveMedia}
    />
  );
};

export default Chrono;
