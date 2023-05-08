import dayjs from 'dayjs';
import 'focus-visible';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TimelineItemModel } from '../models/TimelineItemModel';
import { TimelineProps } from '../models/TimelineModel';
import GlobalContextProvider from './GlobalContext';
import Timeline from './timeline/timeline';
const toReactArray = React.Children.toArray;

const Chrono: React.FunctionComponent<Partial<TimelineProps>> = (
  props: Partial<TimelineProps>,
) => {
  const {
    allowDynamicUpdate = false,
    children,
    items,
    onScrollEnd,
    slideShow = false,
    onItemSelected,
    activeItemIndex = 0,
    titleDateFormat = 'MMM DD, YYYY',
    mode,
    enableOutline,
    hideControls,
  } = props;

  const [timeLineItems, setItems] = useState<TimelineItemModel[]>([]);
  const timeLineItemsRef = useRef<TimelineItemModel[]>();
  const [slideShowActive, setSlideshowActive] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState(activeItemIndex);

  const initItems = (lineItems?: TimelineItemModel[]): TimelineItemModel[] => {
    if (lineItems && lineItems.length) {
      return lineItems.map((item, index) => {
        const id = Math.random().toString(16).slice(2);

        return {
          ...item,
          _dayjs: dayjs(item.date),
          active: index === activeItemIndex,
          id,
          items: item.items?.map((subItem) => ({
            ...subItem,
            _dayjs: dayjs(subItem.date),
            id: Math.random().toString(16).slice(2),
            isNested: true,
            visible: true,
          })),
          title: item.date
            ? dayjs(item.date).format(titleDateFormat)
            : item.title,
          visible: true,
        };
      });
    }

    const itemLength = React.Children.toArray(children).filter(
      (item) => (item as React.ReactElement).props.className !== 'chrono-icons',
    ).length;

    return Array.from({ length: itemLength }).map((_, index) => ({
      active: index === activeItemIndex,
      id: Math.random().toString(16).slice(2),
      visible: true,
    }));
  };

  const updateItems = (lineItems: TimelineItemModel[]) => {
    if (lineItems) {
      const pos = timeLineItems.length;

      return lineItems.map((item, index) => ({
        ...item,
        active: index === pos,
        // id: Math.random().toString(16).slice(2),
        visible: true,
      }));
    } else {
      return [];
    }
  };

  useEffect(() => {
    const _items = items?.filter((item) => item);
    let newItems: TimelineItemModel[] = [];

    if (!_items?.length) {
      const lineItems = initItems();
      setItems(lineItems);
      return;
    }

    if (timeLineItems.length && _items.length > timeLineItems.length) {
      newItems = updateItems(_items);
    } else if (_items.length) {
      newItems = initItems(_items);
    }

    if (newItems.length) {
      timeLineItemsRef.current = newItems;
      setItems(newItems);
    }
  }, [JSON.stringify(allowDynamicUpdate ? items : null)]);

  const handleTimelineUpdate = useCallback((actvTimelineIndex: number) => {
    setItems((lineItems) =>
      lineItems.map((item, index) => ({
        ...item,
        active: index === actvTimelineIndex,
        visible: actvTimelineIndex >= 0,
      })),
    );

    setActiveTimelineItem(actvTimelineIndex);

    if (items) {
      if (items.length - 1 === actvTimelineIndex) {
        setSlideshowActive(false);
      }
    }
  }, []);

  useEffect(() => {
    handleTimelineUpdate(activeItemIndex);
  }, [activeItemIndex]);

  const restartSlideShow = useCallback(() => {
    handleTimelineUpdate(-1);

    setTimeout(() => {
      setSlideshowActive(true);
      handleTimelineUpdate(0);
    }, 0);
  }, []);

  const handleOnNext = () => {
    if (!timeLineItems.length) {
      return;
    }
    if (activeTimelineItem < timeLineItems.length - 1) {
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

  const handleLast = () => {
    if (timeLineItems.length) {
      const idx = timeLineItems.length - 1;
      setActiveTimelineItem(idx);
      handleTimelineUpdate(idx);
    }
  };

  const handleOutlineSelection = useCallback(
    (index: number) => {
      if (index >= 0) {
        setActiveTimelineItem(index);
        handleTimelineUpdate(index);
      }
    },
    [timeLineItems.length],
  );

  const onPaused = useCallback(() => {
    setSlideshowActive(false);
  }, []);

  let iconChildren = toReactArray(children).filter(
    (item) => (item as any).props.className === 'chrono-icons',
  );

  if (iconChildren.length) {
    iconChildren = (iconChildren[0] as any).props.children;
  }

  return (
    <GlobalContextProvider {...props}>
      <Timeline
        activeTimelineItem={activeTimelineItem}
        contentDetailsChildren={toReactArray(children).filter(
          (item) => (item as any).props.className !== 'chrono-icons',
        )}
        iconChildren={iconChildren}
        items={timeLineItems}
        onFirst={handleFirst}
        onLast={handleLast}
        onNext={handleOnNext}
        onPrevious={handleOnPrevious}
        onRestartSlideshow={restartSlideShow}
        onTimelineUpdated={handleTimelineUpdate}
        slideShow={slideShow}
        slideShowEnabled={slideShow}
        slideShowRunning={slideShowActive}
        onScrollEnd={onScrollEnd}
        onItemSelected={onItemSelected}
        onOutlineSelection={handleOutlineSelection}
        mode={mode}
        enableOutline={enableOutline}
        hideControls={hideControls}
        onPaused={onPaused}
      />
    </GlobalContextProvider>
  );
};

export default Chrono;
