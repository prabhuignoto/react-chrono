import { Theme } from '@models/Theme';
import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { ComponentContainerTree, Vertical } from '../../App.styles';

export const VerticalTree: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
  theme: Theme;
  children?: React.ReactNode;
}> = ({ type, items, theme, children }) => {
  return (
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
        >
          <div className="chrono-icons">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/twitter.png"
              alt="twitter"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/about.png"
              alt="about"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/contacts.png"
              alt="contacts"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/briefcase.png"
              alt="briefcase"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/idea.png"
              alt="idea"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/sun.png"
              alt="sun"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/info.png"
              alt="info"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/calendar.png"
              alt="calendar"
            />
            <img
              src="https://img.icons8.com/ios-filled/50/000000/mailbox-closed-flag-down.png"
              alt="mail-box"
            />
            <img
              src="https://img.icons8.com/ios-filled/50/000000/pinterest.png"
              alt="pinterest"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/reddit.png"
              alt="reddit"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/facebook.png"
              alt="facebook"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/stumbleupon.png"
              alt="stumbleupon"
            />
          </div>
        </Chrono>
        {children}
      </ComponentContainerTree>
    </Vertical>
  );
}; 