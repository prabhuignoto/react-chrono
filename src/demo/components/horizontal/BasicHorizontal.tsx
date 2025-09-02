import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent, useState } from 'react';
import Chrono from '../../../components';
import { componentContainer, componentContainerDesktop, componentContainerBigScreen, componentContainerTablet, horizontal } from '../../App.css';

export interface BasicHorizontalProps {
  type: string;
  items: TimelineItemModel[];
}

export const BasicHorizontal: FunctionComponent<BasicHorizontalProps> = ({ 
  items 
}) => {
  const [itemSelected, setItemSelected] = useState(0);

  return (
    <div className={horizontal} id="horizontal">
      <span>{itemSelected}</span>
      <div className={componentContainerBigScreen}>
        <Chrono
          items={items}
          mode="HORIZONTAL"
          cardHeight={450}
          cardWidth={550}
          mediaHeight={300}
          slideShow
          slideItemDuration={2550}
          itemWidth={300}
          onItemSelected={(selected) => setItemSelected(selected.index)}
          timelinePointDimension={20}
          timelinePointShape="square"
          parseDetailsAsHTML
          buttonTexts={{
            first: 'Jump to First',
            last: 'Jump to Last',
            next: 'Next',
            previous: 'Previous',
          }}
          enableDarkToggle
          mediaSettings={{
            align: 'center',
            fit: 'cover',
          }}
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