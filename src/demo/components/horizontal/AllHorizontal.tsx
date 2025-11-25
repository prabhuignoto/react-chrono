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
      {/* Large test div to verify focus doesn't jump to timeline on load */}
      <div style={{
        height: '800px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Scroll Down to See Timeline</h1>
          <p style={{ fontSize: '1rem', marginTop: '1rem' }}>
            If focusOnLoad is working correctly, the page should NOT auto-scroll to the timeline below
          </p>
        </div>
      </div>

      <div className={componentContainerBigScreen} style={{ minHeight: '700px', maxHeight: '1600px', padding: '20px', overflow: 'hidden' }}>
        <span>{index}</span>
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
          interaction={{
            focusOnLoad: false, // Test: should NOT steal focus on load
          }}
          // onItemSelected={(selected: number) => {
          //   setIndex(selected);
          // }}
          timelinePointDimension={20}
          showAllCardsHorizontal
          activeItemIndex={8}
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