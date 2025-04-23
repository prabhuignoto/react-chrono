import React, { useCallback, useEffect, useState } from 'react';
import Chrono from '../components';
import data from './data';
import { TimelineItemModel } from '@models/TimelineItemModel';

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [allItems, setAllItems] = useState<TimelineItemModel[]>([]);
  const [items, setItems] = useState<TimelineItemModel[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAutoLoad = useCallback(() => {
    setLoading(false);

    if (items.length < 1 || pageIndex * 2 >= allItems.length) {
      return;
    }

    const newItemsToAdd = allItems.slice(pageIndex * 2, pageIndex * 2 + 2);
    
    console.log('handleAutoLoad', { pageIndex, newItemsToAdd });
    
    setItems(prevItems => [...prevItems, ...newItemsToAdd]);
  }, [items.length, pageIndex, allItems]);

  useEffect(() => {
    const newAllItems = [...data];

    // console.log('newAllItems', newAllItems);

    setAllItems(newAllItems);
    setPageIndex(0);
    setItems(newAllItems.slice(0, 2));
  }, []);

  useEffect(() => {
    if (loading) {
      handleAutoLoad();
    }
  }, [loading, handleAutoLoad]);

  const handleLoadMore = useCallback(() => {
    if (items.length > 13 || pageIndex * 2 + 2 >= allItems.length) {
      return;
    }

    // console.log('handleLoadMore');

    setPageIndex(pageIndex + 1);
    setLoading(true);
  }, [items.length, pageIndex, allItems.length]);

  // console.log('items', items);

  return (
    <div className="App">
      <div style={{ width: '650px', height: '650px' }}>
        <Chrono
          items={items}
          mode="VERTICAL_ALTERNATING"
          scrollable={{ scrollbar: true }}
          onScrollEnd={handleLoadMore}
          allowDynamicUpdate={true}
        />
      </div>
    </div>
  );
}
