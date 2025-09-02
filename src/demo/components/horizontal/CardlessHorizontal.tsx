import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, componentContainerTreeDesktop, componentContainerTreeBigScreen, componentContainerTreeTablet, componentContainerTreeMobile, vertical } from '../../App.css';

export interface CardlessHorizontalProps {
  type: string;
  items: TimelineItemModel[];
}

export const CardlessHorizontal: FunctionComponent<CardlessHorizontalProps> = ({ 
  type, 
  items 
}) => (
  <div className={vertical} id="vertical">
    <div className={
      type === 'desktop' ? componentContainerTreeDesktop :
      type === 'big-screen' ? componentContainerTreeBigScreen :
      type === 'tablet' ? componentContainerTreeTablet :
      type === 'mobile' ? componentContainerTreeMobile :
      componentContainerTree
    }>
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
    </div>
  </div>
); 