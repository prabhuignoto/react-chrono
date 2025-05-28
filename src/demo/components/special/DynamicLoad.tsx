import React, { useCallback, useEffect, useState } from 'react';
import Chrono from '../../../components';
import { ComponentContainer, Horizontal } from '../../App.styles';

const DynamicLoad: React.FC = () => {
  const [items, setItems] = useState([
    {
      cardDetailedText: 'Sample text',
      cardSubtitle: 'Sample subtitle',
      cardTitle: 'Sample Title',
      title: 'May 1940',
    },
  ]);

  const loadMore = useCallback(() => {
    const newItems = [
      ...items,
      {
        cardDetailedText: 'Sample text',
        cardSubtitle: 'Sample subtitle',
        cardTitle: 'Sample Title',
        title: `Item ${items.length + 1}`,
      },
    ];
    setItems(newItems);
  }, [items]);

  useEffect(() => {
    const id = setTimeout(loadMore, 2000);
    return () => clearTimeout(id);
  }, [loadMore]);

  return (
    <Horizontal id="horizontal">
      <ComponentContainer type="big-screen">
        <Chrono
          items={items}
          mode="HORIZONTAL"
          scrollable
          enableBreakPoint
          cardHeight={200}
          contentDetailsHeight={100}
          allowDynamicUpdate
          theme={{
            cardDetailsColor: '#555',
          }}
        />
      </ComponentContainer>
    </Horizontal>
  );
};

export { DynamicLoad }; 