import { Theme } from '@models/Theme';
import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, componentContainerTreeDesktop, componentContainerTreeBigScreen, componentContainerTreeTablet, componentContainerTreeMobile, vertical } from '../../App.css';
import { pickDefined } from '../../../utils/propUtils';

export interface AlternatingVerticalProps {
  type: string;
  items: TimelineItemModel[];
  theme: Theme;
  children?: React.ReactElement | React.ReactElement[];
}

export const AlternatingVertical: FunctionComponent<AlternatingVerticalProps> = ({ 
  type, 
  items, 
  theme,
  children 
}) => (
  <div className={vertical} id="tree">
    <div className={
      type === 'desktop' ? componentContainerTreeDesktop :
      type === 'big-screen' ? componentContainerTreeBigScreen :
      type === 'tablet' ? componentContainerTreeTablet :
      type === 'mobile' ? componentContainerTreeMobile :
      componentContainerTree
    }>
      <Chrono
        items={items}
        mode="alternating"
        theme={theme}
        allowDynamicUpdate
        onItemSelected={(selected) => console.log(selected)}
        onScrollEnd={() => console.log('end reached')}
        
        layout={{
          cardHeight: 200,
          cardWidth: 400,
          responsive: {
            enabled: true,
          },
        }}
        
        interaction={{
          focusOnLoad: true,
          cardHover: true,
        }}
        
        display={{
          toolbar: { 
            enabled: false 
          },
        }}
        
        animation={{
          slideshow: {
            enabled: true,
            duration: 2050,
            type: 'slide',
          },
        }}
        
        darkMode={{
          showToggle: true,
        }}
        
        {...pickDefined({ children })}
      />
    </div>
  </div>
); 