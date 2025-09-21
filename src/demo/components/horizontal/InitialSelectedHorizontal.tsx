import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainer, componentContainerDesktop, componentContainerBigScreen, componentContainerTablet, horizontal } from '../../App.css';

export interface InitialSelectedHorizontalProps {
  type: string;
  items: TimelineItemModel[];
}

export const InitialSelectedHorizontal: FunctionComponent<InitialSelectedHorizontalProps> = ({ 
  items 
}) => (
  <div className={horizontal} id="horizontal">
    <div className={componentContainerBigScreen} style={{ minHeight: '600px', maxHeight: '800px', padding: '20px', overflow: 'hidden' }}>
      <Chrono
        items={items}
        activeItemIndex={2}
        mode="HORIZONTAL"
        cardHeight={150}
        slideShow
        slideItemDuration={2550}
        itemWidth={200}
        cardLess
        onItemSelected={(selected) => console.log(selected)}
      >
        <div className="chrono-icons">
          <img src="color-circle.svg" alt="timeline icon" />
          <img src="color-circle.svg" alt="timeline icon" />
          <img src="color-circle.svg" alt="timeline icon" />
          <img src="color-circle.svg" alt="timeline icon" />
          <img src="color-circle.svg" alt="timeline icon" />
        </div>
      </Chrono>
    </div>
  </div>
); 