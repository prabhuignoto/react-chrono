import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { ComponentContainerTree, Vertical } from '../../App.styles';

export interface NewMediaVerticalProps {
  type: string;
  items: TimelineItemModel[];
}

export const NewMediaVertical: FunctionComponent<NewMediaVerticalProps> = ({ 
  type, 
  items 
}) => (
  <Vertical id="vertical">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING"
        slideShow
        showAllCardsHorizontal
        cardWidth={450}
        slideItemDuration={2000}
        scrollable={{ scrollbar: false }}
        textOverlay
        parseDetailsAsHTML
        onItemSelected={(selected) => console.log(selected.index)}
        fontSizes={{
          title: '1.5rem',
        }}
        theme={{
          cardDetailsColor: '#2f4f4f',
        }}
        cardHeight={350}
        focusActiveItemOnLoad
        activeItemIndex={9}
        enableDarkToggle
        contentDetailsHeight={200}
        timelinePointDimension={20}
        classNames={{
          cardText: 'custom-text',
        }}
      />
    </ComponentContainerTree>
  </Vertical>
); 