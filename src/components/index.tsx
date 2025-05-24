import { TimelineItemModel } from '@models/TimelineItemModel';
import { TimelineProps } from '@models/TimelineModel';
import { getUniqueID } from '@utils/index';
import dayjs from 'dayjs';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import GlobalContextProvider from './GlobalContext';
import Timeline from './timeline/timeline';
const toReactArray = React.Children.toArray;

const Chrono: React.FunctionComponent<Partial<TimelineProps>> = (
  props: TimelineProps,
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
  } = props;

  const [timeLineItems, setTimeLineItems] = useState<TimelineItemModel[]>([]);
  const timeLineItemsRef = useRef<TimelineItemModel[]>([]);
  const [slideShowActive, setSlideShowActive] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState(activeItemIndex);

  // Cache the last processed items to avoid unnecessary reprocessing
  const itemsHashRef = useRef<string>('');
  const processedItemsCache = useRef<TimelineItemModel[]>([]);

  // Memoize the initItems function
  const initItems = useCallback(
    (lineItems?: TimelineItemModel[]): TimelineItemModel[] => {
      if (lineItems?.length) {
        return lineItems.map((item, index) => {
          const id = getUniqueID();

          return {
            ...item,
            _dayjs: dayjs(item.date),
            active: index === activeItemIndex,
            id,
            items: item.items?.map((subItem) => ({
              ...subItem,
              _dayjs: dayjs(subItem.date),
              id: getUniqueID(),
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
        (item) =>
          (item as React.ReactElement<any>).props.className !== 'chrono-icons',
      ).length;

      return Array.from({ length: itemLength }).map((_, index) => ({
        active: index === activeItemIndex,
        id: getUniqueID(),
        visible: true,
      }));
    },
    [activeItemIndex, titleDateFormat, children],
  );

  // Optimize updateItems function
  const updateItems = useCallback(
    (lineItems: TimelineItemModel[]) => {
      if (lineItems) {
        const pos = timeLineItems.length;

        return lineItems.map((item, index) => ({
          ...item,
          active: index === pos,
          visible: true,
        }));
      } else {
        return [];
      }
    },
    [timeLineItems.length],
  );

  // Create a stable hash for items comparison
  const createItemsHash = useCallback((items: any[]) => {
    if (!items?.length) return '';
    return items
      .map((item) => ({
        id: item.id,
        date: item.date,
        title: item.title,
        cardTitle: item.cardTitle,
      }))
      .map((item) => JSON.stringify(item))
      .join('|');
  }, []);

  useEffect(() => {
    const _items = items?.filter((item) => item);
    let newItems: TimelineItemModel[] = [];

    if (!_items?.length) {
      const lineItems = initItems();
      setTimeLineItems(lineItems);
      return;
    }

    // Use efficient comparison instead of JSON.stringify on entire array
    const currentHash = createItemsHash(_items);

    if (!allowDynamicUpdate && currentHash === itemsHashRef.current) {
      return; // No changes, skip processing
    }

    itemsHashRef.current = currentHash;

    if (timeLineItems.length && _items.length > timeLineItems.length) {
      newItems = updateItems(_items);
    } else if (_items.length) {
      newItems = initItems(_items);
    }

    if (newItems.length) {
      timeLineItemsRef.current = newItems;
      setTimeLineItems(newItems);
      setActiveTimelineItem(0);
      processedItemsCache.current = newItems;
    }
  }, [
    items,
    allowDynamicUpdate,
    timeLineItems.length,
    initItems,
    updateItems,
    createItemsHash,
  ]);

  const handleTimelineUpdate = useCallback(
    (actvTimelineIndex: number) => {
      setTimeLineItems((lineItems) =>
        lineItems.map((item, index) => ({
          ...item,
          active: index === actvTimelineIndex,
          visible: actvTimelineIndex >= 0,
        })),
      );

      setActiveTimelineItem(actvTimelineIndex);

      if (items) {
        if (items.length - 1 === actvTimelineIndex) {
          setSlideShowActive(false);
        }
      }
    },
    [items],
  );

  useEffect(() => {
    handleTimelineUpdate(activeItemIndex);
  }, [activeItemIndex, handleTimelineUpdate]);

  const restartSlideShow = useCallback(() => {
    handleTimelineUpdate(-1);

    setTimeout(() => {
      setSlideShowActive(true);
      handleTimelineUpdate(0);
    }, 0);
  }, [handleTimelineUpdate]);

  const handleOnNext = useCallback(() => {
    if (!timeLineItems.length) {
      return;
    }
    if (activeTimelineItem < timeLineItems.length - 1) {
      const newTimeLineItem = activeTimelineItem + 1;

      handleTimelineUpdate(newTimeLineItem);
      setActiveTimelineItem(newTimeLineItem);
    }
  }, [timeLineItems.length, activeTimelineItem, handleTimelineUpdate]);

  const handleOnPrevious = useCallback(() => {
    if (activeTimelineItem > 0) {
      const newTimeLineItem = activeTimelineItem - 1;

      handleTimelineUpdate(newTimeLineItem);
      setActiveTimelineItem(newTimeLineItem);
    }
  }, [activeTimelineItem, handleTimelineUpdate]);

  const handleFirst = useCallback(() => {
    setActiveTimelineItem(0);
    handleTimelineUpdate(0);
  }, [handleTimelineUpdate]);

  const handleLast = useCallback(() => {
    if (timeLineItems.length) {
      const idx = timeLineItems.length - 1;
      setActiveTimelineItem(idx);
      handleTimelineUpdate(idx);
    }
  }, [timeLineItems.length, handleTimelineUpdate]);

  const handleOutlineSelection = useCallback(
    (index: number) => {
      if (index >= 0) {
        setActiveTimelineItem(index);
        handleTimelineUpdate(index);
      }
    },
    [handleTimelineUpdate],
  );

  const onPaused = useCallback(() => {
    setSlideShowActive(false);
  }, []);

  // Memoize icon children processing
  const iconChildren = useMemo(() => {
    const iconChildArray = toReactArray(children).filter((item) => {
      if (!React.isValidElement(item)) return false;
      const props = item.props as {
        className?: string;
        children?: React.ReactNode;
      };
      return props?.className === 'chrono-icons';
    });

    if (iconChildArray.length) {
      const firstIcon = iconChildArray[0] as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      return firstIcon.props.children || null;
    }
    return iconChildArray;
  }, [children]);

  // Memoize content details children
  const contentDetailsChildren = useMemo(() => {
    return toReactArray(children).filter((item) => {
      if (!React.isValidElement(item)) return true;
      const props = item.props as { className?: string };
      return props?.className !== 'chrono-icons';
    });
  }, [children]);

  return (
    <GlobalContextProvider {...props}>
      <Timeline
        activeTimelineItem={activeTimelineItem}
        contentDetailsChildren={contentDetailsChildren}
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
        onPaused={onPaused}
      />
    </GlobalContextProvider>
  );
};

export default React.memo(Chrono);
