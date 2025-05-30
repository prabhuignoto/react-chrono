import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { ComponentContainer, Horizontal } from '../../App.styles';

export interface InitialSelectedHorizontalProps {
  type: string;
  items: TimelineItemModel[];
}

export const InitialSelectedHorizontal: FunctionComponent<InitialSelectedHorizontalProps> = ({ 
  items 
}) => (
  <Horizontal id="horizontal">
    <ComponentContainer type={'big-screen'}>
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
    </ComponentContainer>
  </Horizontal>
); 