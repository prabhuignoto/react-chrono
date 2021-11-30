import React, { useCallback, useEffect, useState } from "react";
import Chrono from "../components";
import data from "./data";

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [allItems, setAllItems] = useState([null]);
  const [items, setItems] = useState([null]);
  const [loading, setLoading] = useState(true);

  const handleAutoLoad = useCallback(() => {
    setLoading(false);

    if (items.length < 2) {
      return;
    }

    const newItems = [...items, ...allItems.splice(pageIndex * 2, 2)];

    console.log('handleAutoLoad', { pageIndex, newItems });

    setItems(newItems);
  }, [items.length, pageIndex]);

  useEffect(() => {
    const newAllItems = [...data];

    // console.log('newAllItems', newAllItems);

    setAllItems(newAllItems);
    setPageIndex(0);
    setItems(newAllItems.splice(0, 2));
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
      <div style={{ width: "650px", height: "650px" }}>
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
