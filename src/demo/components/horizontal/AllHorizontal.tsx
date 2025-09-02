import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainer, componentContainerDesktop, componentContainerBigScreen, componentContainerTablet, horizontal } from '../../App.css';

export interface AllHorizontalProps {
  type: string;
  items: TimelineItemModel[];
}

export const AllHorizontal: FunctionComponent<AllHorizontalProps> = ({ 
  items 
}) => {
  const [index, setIndex] = React.useState(-1);
  
  return (
    <div className={horizontal} id="horizontal">
      <div className={componentContainerBigScreen}>
        <span>{index}</span>
        <Chrono
          items={items}
          mode="HORIZONTAL"
          cardHeight={350}
          cardWidth={500}
          enableDarkToggle
          slideShow
          textOverlay
          mediaHeight={250}
          slideItemDuration={2550}
          itemWidth={400}
          focusActiveItemOnLoad
          onItemSelected={(selected) => {
            setIndex(selected.index);
          }}
          timelinePointDimension={20}
          showAllCardsHorizontal
          activeItemIndex={8}
        >
          <div className="chrono-icons">
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
          </div>
        </Chrono>
      </div>
    </div>
  );
}; 