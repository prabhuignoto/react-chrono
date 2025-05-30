import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { ComponentContainerTree, Vertical } from '../../App.styles';

export interface CardlessHorizontalProps {
  type: string;
  items: TimelineItemModel[];
}

export const CardlessHorizontal: FunctionComponent<CardlessHorizontalProps> = ({ 
  type, 
  items 
}) => (
  <Vertical id="vertical">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="HORIZONTAL"
        cardLess
        theme={{
          cardBgColor: '#fff',
          titleColorActive: 'red',
        }}
        onItemSelected={(selected) => console.log(selected.cardTitle)}
      />
    </ComponentContainerTree>
  </Vertical>
); 