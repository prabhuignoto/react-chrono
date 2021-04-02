import React, { useState, useEffect, useCallback } from "react";
import Chrono from "../components";
import data from "./data";
import data2 from "./data2";

export default function App() {
  const [items, setItems] = useState([null]);
  const [loading, setLoading] = useState(true);

  const handleAutoLoad = useCallback(() => {
    setLoading(false);
    if (items.length < 13) {
      setItems(data);
      return;
    }
    setItems([...data, ...data2]);
  }, [items.length]);

  useEffect(() => {
    if (loading) {
      handleAutoLoad();
    }
  }, [loading, handleAutoLoad]);

  const handleLoadMore = useCallback(() => {
    if (items.length > 26) {
      return;
    }
    setLoading(true);
  }, [items.length]);

  return (
    <div className="App">
      <div style={{ width: "950px", height: "950px" }}>
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
