import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, componentContainerTreeDesktop, componentContainerTreeBigScreen, componentContainerTreeTablet, componentContainerTreeMobile, vertical } from '../../App.css';
import { mixedTimeline } from '../../data';

export interface MixedVerticalProps {
  type: string;
  cardHeight?: number;
}

export const MixedVertical: FunctionComponent<MixedVerticalProps> = ({ 
  type, 
  cardHeight 
}) => (
  <div className={vertical}>
    <div className={
      type === 'desktop' ? componentContainerTreeDesktop :
      type === 'big-screen' ? componentContainerTreeBigScreen :
      type === 'tablet' ? componentContainerTreeTablet :
      type === 'mobile' ? componentContainerTreeMobile :
      componentContainerTree
    }>
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
    </div>
  </div>
);