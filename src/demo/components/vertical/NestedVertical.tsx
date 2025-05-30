import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { ComponentContainerTree, Vertical } from '../../App.styles';

export interface NestedVerticalProps {
  type: string;
  items: TimelineItemModel[];
}

export const NestedVertical: FunctionComponent<NestedVerticalProps> = ({ 
  type, 
  items 
}) => (
  <Vertical id="vertical">
    <ComponentContainerTree type={type}>
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
      />
    </ComponentContainerTree>
  </Vertical>
); 