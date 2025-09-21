import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, componentContainerTreeDesktop, componentContainerTreeBigScreen, componentContainerTreeTablet, componentContainerTreeMobile, vertical } from '../../App.css';

export interface CardlessVerticalProps {
  type: string;
  items: TimelineItemModel[];
}

export const CardlessVertical: FunctionComponent<CardlessVerticalProps> = ({ 
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
    } style={{ minHeight: '600px', maxHeight: '800px', padding: '20px', overflow: 'hidden' }}>
      <Chrono
        items={items}
        mode="VERTICAL"
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