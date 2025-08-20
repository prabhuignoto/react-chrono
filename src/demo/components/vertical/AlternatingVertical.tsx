import { Theme } from '@models/Theme';
import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { ComponentContainerTree, Vertical } from '../../App.styles';
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
  <Vertical id="tree">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING"
        theme={theme}
        slideShow
        slideItemDuration={2050}
        slideShowType="slide_from_sides"
        allowDynamicUpdate
        cardHeight={200}
        disableToolbar
        focusActiveItemOnLoad
        enableDarkToggle
        cardWidth={400}
        onItemSelected={(selected) => console.log(selected)}
        onScrollEnd={() => console.log('end reached')}
        enableBreakPoint
        highlightCardsOnHover
        contentDetailsHeight={200}
        {...pickDefined({ children })}
      />
    </ComponentContainerTree>
  </Vertical>
); 