import React, { useState, useCallback } from 'react';
import Chrono from '../components';

/**
 * Demo for Issue #291: Dynamic updates with Array.map() pattern
 *
 * This demo shows that the timeline correctly detects and renders
 * changes when using the children pattern with Array.map() instead
 * of the items prop array.
 */

interface TimelineItem {
  id: number;
  title: string;
  cardTitle: string;
  cardDetailedText: string;
}

const initialItems: TimelineItem[] = [
  {
    id: 1,
    title: 'May 2020',
    cardTitle: 'Initial Release',
    cardDetailedText: 'First version of the product launched',
  },
  {
    id: 2,
    title: 'June 2020',
    cardTitle: 'Feature Update',
    cardDetailedText: 'Added new features based on user feedback',
  },
];

export default function ArrayMapDynamic() {
  const [items, setItems] = useState<TimelineItem[]>(initialItems);
  const [nextId, setNextId] = useState(3);

  const handleAddItem = useCallback(() => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[Math.floor(Math.random() * months.length)];
    const year = 2020 + Math.floor(Math.random() * 3);

    const newItem: TimelineItem = {
      id: nextId,
      title: `${month} ${year}`,
      cardTitle: `Update #${nextId}`,
      cardDetailedText: `Description for update ${nextId}`,
    };

    setItems([...items, newItem]);
    setNextId(nextId + 1);
  }, [items, nextId]);

  const handleRemoveItem = useCallback(() => {
    if (items.length > 1) {
      setItems(items.slice(0, -1));
    }
  }, [items]);

  const handleReset = useCallback(() => {
    setItems(initialItems);
    setNextId(3);
  }, []);

  return (
    <div className="App" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={handleAddItem}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0f52ba',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Item
        </button>
        <button
          onClick={handleRemoveItem}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          disabled={items.length <= 1}
        >
          Remove Item
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
        <span style={{ padding: '10px', fontWeight: 'bold' }}>
          Items: {items.length}
        </span>
      </div>

      <div style={{ width: '100%', height: '500px' }}>
        <Chrono
          mode="alternating"
          allowDynamicUpdate={true}
          display={{
            scrollable: { scrollbar: true },
          }}
          interaction={{
            autoScroll: false,
          }}
        >
          {items.map((item) => (
            <div key={item.id} data-testid={`timeline-item-${item.id}`}>
              <h3>{item.cardTitle}</h3>
              <p>{item.cardDetailedText}</p>
            </div>
          ))}
        </Chrono>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <h3>Issue #291: Array.map() Dynamic Updates</h3>
        <p>
          This demo tests that timeline updates correctly when using the children pattern
          with <code>Array.map()</code> instead of the <code>items</code> prop array.
        </p>
        <p>
          <strong>Test:</strong> Click "Add Item" or "Remove Item" buttons. The timeline
          should update immediately to reflect the changes.
        </p>
        <p>
          <strong>Before Fix:</strong> The timeline would not update when children changed.
        </p>
        <p>
          <strong>After Fix:</strong> Timeline detects children count changes and re-renders.
        </p>
      </div>
    </div>
  );
}
