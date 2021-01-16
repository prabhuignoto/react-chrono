import 'focus-visible';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TimelineItemModel } from '../models/TimelineItemModel';
import { TimelineProps } from '../models/TimelineModel';
import GlobalContextProvider from './GlobalContext';
import Timeline from './timeline/timeline';

const Chrono: React.FunctionComponent<Partial<TimelineProps>> = (
  props: Partial<TimelineProps>,
) => {
  const [timeLineItems, setItems] = useState<TimelineItemModel[]>([]);
  const timeLineItemsRef = useRef<TimelineItemModel[]>();
  const [slideShowActive, setSlideshowActive] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  const {
    allowDynamicUpdate = false,
    cardHeight = 150,
    cardPositionHorizontal = 'BOTTOM',
    children,
    disableNavOnKey = false,
    flipLayout,
    hideControls = false,
    itemWidth = 300,
    items,
    mode = 'HORIZONTAL',
    onScrollEnd,
    scrollable = true,
    slideItemDuration = 5000,
    slideShow = false,
    theme,
  } = props;

  const customTheme = Object.assign(
    {
      primary: '#0f52ba',
      secondary: '#ffdf00',
      cardBgColor: '#fff',
      cardForeColor: '#000',
    },
    theme,
  );

  const initItems = () =>
    items && items.length
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

  useEffect(() => {
    const items = initItems();
    timeLineItemsRef.current = items;
    setItems(items);
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

  return (
    <GlobalContextProvider {...props}>
      <Timeline
        activeTimelineItem={activeTimelineItem}
        cardHeight={cardHeight}
        cardPositionHorizontal={cardPositionHorizontal}
        contentDetailsChildren={React.Children.toArray(children).filter(
          (item) => (item as any).props.className !== 'chrono-icons',
        )}
        disableNavOnKey={disableNavOnKey}
        hideControls={hideControls}
        itemWidth={itemWidth}
        items={timeLineItems}
        mode={mode}
        onFirst={handleFirst}
        onLast={handleLast}
        onNext={handleOnNext}
        onPrevious={handleOnPrevious}
        onRestartSlideshow={restartSlideShow}
        onTimelineUpdated={useCallback(handleTimelineUpdate, [])}
        scrollable={scrollable}
        slideItemDuration={slideItemDuration}
        slideShow={slideShow}
        slideShowEnabled={slideShow}
        slideShowRunning={slideShowActive}
        theme={customTheme}
        flipLayout={flipLayout}
        onScrollEnd={onScrollEnd}
      />
    </GlobalContextProvider>
  );
};

export default Chrono;
