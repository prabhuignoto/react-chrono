import React, { FunctionComponent } from 'react';
import Chrono from '../components';
import { TimelineItemModel } from '../models/TimelineItemModel';
import {
  ComponentContainer,
  ComponentContainerTree,
  Horizontal,
  Vertical,
} from './App.styles';
import data from './data';

export const HorizontalBasic: React.FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ items }) => {
  return (
    <Horizontal id="horizontal">
      <ComponentContainer type={'big-screen'}>
        <Chrono
          items={data}
          mode="HORIZONTAL"
          cardHeight={450}
          cardWidth={550}
          mediaHeight={300}
          slideShow
          slideItemDuration={2550}
          itemWidth={300}
          onItemSelected={(selected) => console.log(selected)}
          timelinePointDimension={20}
          // cardPositionHorizontal="TOP"
          buttonTexts={{
            first: 'Jump to First',
            last: 'Jump to Last',
            next: 'Next',
            previous: 'Previous',
          }}
          enableDarkToggle
          mediaSettings={{
            imageFit: 'cover',
          }}
        >
          <div className="chrono-icons">
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
          </div>
        </Chrono>
      </ComponentContainer>
    </Horizontal>
  );
};

export const HorizontalAll: React.FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ items }) => {
  return (
    <Horizontal id="horizontal">
      <ComponentContainer type={'big-screen'}>
        <Chrono
          items={items}
          mode="HORIZONTAL"
          cardHeight={350}
          cardWidth={500}
          enableDarkToggle
          slideShow
          // slideShow
          textOverlay
          mediaHeight={250}
          slideItemDuration={2550}
          itemWidth={400}
          focusActiveItemOnLoad
          onItemSelected={(selected) => console.log(selected)}
          timelinePointDimension={20}
          showAllCardsHorizontal
          activeItemIndex={8}
        >
          <div className="chrono-icons">
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
          </div>
        </Chrono>
      </ComponentContainer>
    </Horizontal>
  );
};

export const HorizontalInitialSelectedItem: React.FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ items }) => {
  return (
    <Horizontal id="horizontal">
      <ComponentContainer type={'big-screen'}>
        <Chrono
          items={data}
          activeItemIndex={2}
          mode="HORIZONTAL"
          cardHeight={150}
          slideShow
          slideItemDuration={2550}
          itemWidth={200}
          cardLess
          onItemSelected={(selected) => console.log(selected)}
        >
          <div className="chrono-icons">
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
          </div>
        </Chrono>
      </ComponentContainer>
    </Horizontal>
  );
};

export const HorizontalBasicCardLess: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => (
  <Vertical id="vertical">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="HORIZONTAL"
        cardLess
        theme={{
          cardBgColor: '#fff',
          titleColorActive: 'red',
        }}
        onItemSelected={(selected) => console.log(selected.cardTitle)}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const HorizontalSlideshow: FunctionComponent<{
  type: string;
  cardHeight?: number;
  items: TimelineItemModel[];
}> = ({ type, cardHeight }) => (
  <Horizontal id="slideshow">
    <ComponentContainer type={type}>
      <Chrono
        items={data}
        mode="HORIZONTAL"
        slideShow
        slideItemDuration={1500}
        cardHeight={450}
        scrollable
      />
    </ComponentContainer>
  </Horizontal>
);
