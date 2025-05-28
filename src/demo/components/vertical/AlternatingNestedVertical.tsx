import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { ComponentContainerTree, Vertical } from '../../App.styles';

export interface AlternatingNestedVerticalProps {
  type: string;
  items: TimelineItemModel[];
}

export const AlternatingNestedVertical: FunctionComponent<AlternatingNestedVerticalProps> = ({ 
  type, 
  items 
}) => (
  <Vertical id="vertical">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING"
        slideShow
        cardWidth={600}
        slideItemDuration={2000}
        scrollable={{ scrollbar: false }}
        slideShowType="slide_from_sides"
        mediaSettings={{
          align: 'center',
          fit: 'contain',
        }}
        highlightCardsOnHover
        parseDetailsAsHTML
        onItemSelected={(selected) => console.log(selected.index)}
        fontSizes={{
          title: '1rem',
        }}
        theme={{
          primary: '#191919',
          secondary: '#FFA500',
          titleColor: '#FFA500',
          titleColorActive: '#000',
          cardTitleColor: '#FFA500',
          iconBackgroundColor: '#fff',
        }}
        cardHeight={150}
        timelinePointShape="square"
        mediaHeight={200}
        enableDarkToggle
        timelinePointDimension={30}
        classNames={{
          cardText: 'custom-text',
        }}
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
    </ComponentContainerTree>
  </Vertical>
); 