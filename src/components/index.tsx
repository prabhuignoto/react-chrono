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
  const [timeLineItems, setItems] = useState<TimelineItemModel[]>([]);
  const timeLineItemsRef = useRef<TimelineItemModel[]>();
  const [slideShowActive, setSlideshowActive] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  const {
    allowDynamicUpdate = false,
    children,
    items,
    onScrollEnd,
    slideShow = false,
    theme,
    onItemSelected,
  } = props;

  const customTheme = Object.assign(
    {
      primary: '#0f52ba',
      secondary: '#ffdf00',
      cardBgColor: '#fff',
      cardForeColor: '#000',
      titleColor: '#0f52ba',
    },
    theme,
  );

  const initItems = (items?: TimelineItemModel[]) => {
    return items && items.length
      ? items.map((item, index) => {
          return Object.assign({}, item, {
            id: Math.random().toString(16).slice(2),
            visible: true,
            active: index === 0,
          });
        })
      : Array.from({
          length: React.Children.toArray(children).filter(
            (item) => (item as any).props.className !== 'chrono-icons',
          ).length,
        }).map<Partial<TimelineItemModel>>((item, index) => ({
          id: Math.random().toString(16).slice(2),
          visible: true,
          active: index === 0,
        }));
  };

  const updateItems = (items: TimelineItemModel[]) => {
    if (items) {
      const newStartingPosition = items.length - timeLineItems.length;

      const newItems = items
        .slice(newStartingPosition + 1)
        .map((item, index) => ({
          ...item,
          id: Math.random().toString(16).slice(2),
          visible: true,
          active: index === 0,
        }));

      const updatedLineItems = timeLineItems.map((item) => ({
        ...item,
        active: false,
      }));

      return updatedLineItems.concat(newItems);
    } else {
      return [];
    }
  };

  useEffect(() => {
    const _items = items?.filter((item) => item);
    let newItems: TimelineItemModel[] = [];

    if (!_items?.length) {
      const items = initItems();
      setItems(items);
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
    setItems((items) =>
      items.map((item, index) =>
        Object.assign({}, item, {
          active: index === actvTimelineIndex,
        }),
      ),
    );
    setActiveTimelineItem(actvTimelineIndex);

    if (items) {
      if (items.length - 1 === actvTimelineIndex) {
        setSlideshowActive(false);
      }
    }
  }, []);

  const restartSlideShow = useCallback(() => {
    setSlideshowActive(true);
    handleTimelineUpdate(0);
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
        onTimelineUpdated={useCallback(handleTimelineUpdate, [])}
        slideShow={slideShow}
        slideShowEnabled={slideShow}
        slideShowRunning={slideShowActive}
        theme={customTheme}
        onScrollEnd={onScrollEnd}
        onItemSelected={onItemSelected}
      />
    </GlobalContextProvider>
  );
};

export default Chrono;
