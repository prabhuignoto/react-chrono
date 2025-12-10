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
  // const [index, setIndex] = React.useState(-1);

  return (
    <div className={horizontal} id="horizontal">

      <div className={componentContainerBigScreen} style={{ minHeight: '700px', maxHeight: '1600px', padding: '20px', overflow: 'hidden' }}>
        {/* <span>{index}</span> */}
        <Chrono
          items={items}
          mode="horizontal"
          cardHeight={350}
          cardWidth={500}
          enableDarkToggle
          slideShow
          textOverlay
          mediaHeight={250}
          slideItemDuration={2550}
          itemWidth={400}
          theme={{
            titleColor: '#fff',
          }}
          interaction={{
            focusOnLoad: false, // Test: should NOT steal focus on load
          }}
          // onItemSelected={(selected: number) => {
          //   setIndex(selected);
          // }}
          timelinePointDimension={20}
          showAllCardsHorizontal
          stickyToolbar={true}
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