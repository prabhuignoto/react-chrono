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
            enabled: true,
            sticky: true
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
        
        googleFonts={{
          fontFamily: 'Lato',
          elements: {
            title: { weight: 'bold', style: 'normal', size: '2rem' },
            cardTitle: { weight: 'semi-bold', style: 'normal', size: '1.1rem' },
            cardSubtitle: { weight: 'normal', style: 'normal', size: '0.9rem' },
            cardText: { weight: 'light', style: 'normal', size: '0.85rem' },
            controls: { weight: 'medium', style: 'normal', size: '0.8rem' },
          }
        }}
        
        {...pickDefined({ children })}
      />
    </div>
  </div>
); 