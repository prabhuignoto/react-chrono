import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { ComponentContainerTree, Vertical } from '../../App.styles';
import { mixedTimeline } from '../../data';

export interface MixedVerticalProps {
  type: string;
  cardHeight?: number;
}

export const MixedVertical: FunctionComponent<MixedVerticalProps> = ({ 
  type, 
  cardHeight 
}) => (
  <Vertical>
    <ComponentContainerTree type={type}>
      <Chrono
        items={mixedTimeline}
        mode="VERTICAL"
        cardHeight={cardHeight ?? 300}
        cardWidth={550}
        scrollable
        slideShow
        slideItemDuration={2500}
        enableDarkToggle
        parseDetailsAsHTML
      />
    </ComponentContainerTree>
  </Vertical>
);