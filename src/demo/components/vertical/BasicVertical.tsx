import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, vertical } from '../../App.css';

export interface BasicVerticalProps {
  type: string;
  items: TimelineItemModel[];
}

export const BasicVertical: FunctionComponent<BasicVerticalProps> = ({ 
  type, 
  items 
}) => (
  <div id="vertical" className={vertical}>
    <div className={componentContainerTree}>
      <Chrono
        items={items}
        mode="VERTICAL"
        slideShow
        cardWidth={650}
        slideItemDuration={2500}
        scrollable={{ scrollbar: false }}
        noUniqueId
        uniqueId="vertical_basic_test"
        parseDetailsAsHTML
        highlightCardsOnHover
        enableQuickJump={true}
        toolbarPosition="top"
        onItemSelected={(selected) => console.log(selected.index)}
        fontSizes={{
          title: '1.5rem',
        }}
        theme={{
          cardDetailsColor: '#555555',
        }}
        focusActiveItemOnLoad
        activeItemIndex={2}
        cardHeight={200}
        contentDetailsHeight={10}
        timelinePointDimension={20}
        classNames={{
          cardText: 'custom-text',
        }}
        mediaSettings={{
          align: 'center',
          fit: 'cover',
        }}
        enableDarkToggle
        enableBreakPoint={true}
        responsiveBreakPoint={768}
        textDensity='HIGH'
      />
    </div>
  </div>
); 