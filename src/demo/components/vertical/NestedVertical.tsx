import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, componentContainerTreeDesktop, componentContainerTreeBigScreen, componentContainerTreeTablet, componentContainerTreeMobile, vertical } from '../../App.css';

export interface NestedVerticalProps {
  type: string;
  items: TimelineItemModel[];
}

export const NestedVertical: FunctionComponent<NestedVerticalProps> = ({ 
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
        slideShow
        cardWidth={500}
        slideItemDuration={2500}
        scrollable={{ scrollbar: false }}
        onItemSelected={(selected) => console.log(selected.index)}
        fontSizes={{
          title: '1rem',
        }}
        focusActiveItemOnLoad
        activeItemIndex={2}
        mediaHeight={200}
        nestedCardHeight={100}
        cardHeight={300}
        timelinePointDimension={20}
        classNames={{
          cardText: 'custom-text',
        }}
        parseDetailsAsHTML
        enableDarkToggle
        mediaSettings={{ align: 'center' }}
        stickyToolbar={false}
      />
    </div>
  </div>
); 