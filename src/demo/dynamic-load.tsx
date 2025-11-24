import React, { useCallback, useEffect, useState } from 'react';
import Chrono from '../components';
import { basicTimeline } from './data';

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAutoLoad = useCallback(() => {
    setLoading(false);

    if (items.length < 2) {
      return;
    }

    // FIX: Use slice() instead of splice() to avoid mutating allItems
    const startIdx = pageIndex * 2;
    const newBatch = allItems.slice(startIdx, startIdx + 2);
    const newItems = [...items, ...newBatch];

    console.log('handleAutoLoad', { pageIndex, newItems });

    setItems(newItems);
  }, [items, allItems, pageIndex]); // FIX: Add items and allItems to dependencies

  useEffect(() => {
    const newAllItems = [...basicTimeline];

    // console.log('newAllItems', newAllItems);

    setAllItems(newAllItems);
    setPageIndex(0);
    // FIX: Use slice() instead of splice() to avoid mutating newAllItems
    setItems(newAllItems.slice(0, 2));
  }, []);

  useEffect(() => {
    if (loading) {
      handleAutoLoad();
    }
  }, [loading, handleAutoLoad]);

  const handleLoadMore = useCallback(() => {
    if (items.length > 13) {
      return;
    }

    // console.log('handleLoadMore');

    setPageIndex(pageIndex + 1);
    setLoading(true);
  }, [items.length]);

  // console.log('items', items);

  return (
    <div className="App">
      <div style={{ width: '750px', height: '650px' }}>
        <Chrono
          items={items}
          mode="alternating"
          display={{
            scrollable: { scrollbar: true },
            toolbar: { enabled: true },
          }}
          interaction={{
            autoScroll: true,
          }}
          onScrollEnd={handleLoadMore}
          allowDynamicUpdate={true}
        />
      </div>
    </div>
  );
}
