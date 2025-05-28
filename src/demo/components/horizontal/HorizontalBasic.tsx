import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { ComponentContainer, Horizontal } from '../../App.styles';

export const HorizontalBasic: FunctionComponent<{
  items: TimelineItemModel[];
  type: string;
}> = ({ items, type }) => {
  return (
    <Horizontal id="horizontal">
      <ComponentContainer type={type}>
        <Chrono
          items={items}
          mode="HORIZONTAL"
          scrollable
          enableBreakPoint
          cardHeight={200}
          contentDetailsHeight={130}
          slideShow
          slideItemDuration={2000}
          cardWidth={400}
          theme={{
            cardDetailsColor: '#555',
          }}
        />
      </ComponentContainer>
    </Horizontal>
  );
}; 