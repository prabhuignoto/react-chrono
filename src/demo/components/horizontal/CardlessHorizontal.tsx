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
        mode="horizontal"
        onItemSelected={(selected) => console.log(selected.cardTitle)}
        
        display={{
          cardsDisabled: true,
        }}
        
        theme={{
          cardBgColor: '#fff',
          titleColorActive: 'red',
        }}
      />
    </div>
  </div>
); 