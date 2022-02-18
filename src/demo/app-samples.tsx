import React, { FunctionComponent } from 'react';
import Chrono from '../components';
import { Theme } from '../models/Theme';
import { TimelineItemModel } from '../models/TimelineItemModel';
import {
  ComponentContainer,
  ComponentContainerTree, Horizontal,
  Vertical
} from './App.styles';
import data from './data';
import dataMixed from './data-mixed';

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
          cardHeight={250}
          cardWidth={450}
          slideShow
          slideItemDuration={2550}
          itemWidth={200}
          onItemSelected={selected => console.log(selected)}
          timelineCircleDimension={20}
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

export const HorizontalInitalSelectedItem: React.FunctionComponent<{
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
          onItemSelected={selected => console.log(selected)}
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

export const VerticalBasic: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => (
  <Vertical id="vertical">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="VERTICAL"
        slideShow
        cardWidth={700}
        slideItemDuration={2500}
        scrollable={{ scrollbar: false}}
        theme={{ cardBgColor: "#fff", cardForeColor: "blue", titleColor: "red" }}
        onItemSelected={(selected) => console.log(selected.cardTitle)}
        enableOutline
        timelineCircleDimension={20}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalBasicCardLess: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => (
  <Vertical id="vertical">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="HORIZONTAL"
        cardLess
        theme={{ cardBgColor: "#fff", cardForeColor: "blue", titleColor: "red" }}
        onItemSelected={(selected) => console.log(selected.cardTitle)}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const HorizontalBasicCardLess: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => (
  <Vertical id="vertical">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING"
        cardLess
        flipLayout
        theme={{ cardBgColor: "#fff", cardForeColor: "blue", titleColor: "red" }}
        onItemSelected={(selected) => console.log(selected.cardTitle)}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalTree: FunctionComponent<{
  type: string,
  items: TimelineItemModel[],
  theme: Theme
}> = ({ type, items, theme }) => {

  return <Vertical id="tree">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING"
        theme={theme}
        slideShow
        slideItemDuration={2350}
        allowDynamicUpdate
        // cardHeight={100}
        cardWidth={450}
        onItemSelected={(selected) => console.log(selected.cardTitle)}
        onScrollEnd={() => console.log('end reached')}
      >
        <div className="chrono-icons">
          <img src="https://img.icons8.com/ios-filled/100/000000/twitter.png" alt="twitter" />
          <img src="https://img.icons8.com/ios-filled/100/000000/about.png" alt="twitter" />
          <img src="https://img.icons8.com/ios-filled/100/000000/contacts.png" alt="twitter" />
          <img src="https://img.icons8.com/ios-filled/100/000000/briefcase.png" alt="twitter" />
          <img src="https://img.icons8.com/ios-filled/100/000000/idea.png" alt="twitter" />
          <img src="https://img.icons8.com/ios-filled/100/000000/sun.png" alt="twitter" />
          <img src="https://img.icons8.com/ios-filled/100/000000/info.png" alt="twitter" />
          <img src="https://img.icons8.com/ios-filled/100/000000/calendar.png" alt="twitter" />
          <img src="https://img.icons8.com/ios-filled/50/000000/mailbox-closed-flag-down.png" alt="mail-box" />
          <img src="https://img.icons8.com/ios-filled/50/000000/pinterest.png" alt="pinterest" />
          <img src="https://img.icons8.com/ios-filled/100/000000/reddit.png" alt="reddit" />
          <img src="https://img.icons8.com/ios-filled/100/000000/facebook.png" alt="reddit" />
          <img src="https://img.icons8.com/ios-filled/100/000000/stumbleupon.png" alt="reddit" />
        </div>
      </Chrono>
    </ComponentContainerTree>
  </Vertical>
}
  ;

export const VerticalTreeMixed: FunctionComponent<{
  type: string;
  cardHeight?: number;
}> = ({ type, cardHeight }) => (
  <Vertical>
    <ComponentContainerTree type={type}>
      <Chrono
        items={dataMixed}
        mode="VERTICAL_ALTERNATING"
        cardHeight={300}
        cardWidth={450}
        scrollable
      // theme={{ primary: '#8675a9', secondary: '#ffd5cd' }}
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


export const VerticalTreeSlideshow: FunctionComponent<{
  type: string;
  cardHeight: number;
}> = ({ type, cardHeight }) => (
  <Vertical>
    <ComponentContainerTree type={type}>
      <Chrono
        items={data}
        mode="VERTICAL_ALTERNATING"
        cardHeight={200}
        scrollable
      // theme={{ primary: '#8675a9', secondary: '#ffd5cd' }}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalCustomContent: FunctionComponent<{
  type: string;
  cardHeight?: number;
}> = ({ type, cardHeight }) => (
  <Vertical>
    <ComponentContainerTree type={type}>
      <Chrono
        mode="VERTICAL"
        cardHeight={200}
        cardWidth={650}
        scrollable
      >
        <div>
          <div style={{ width: "250px", height: "250px" }}>
            <img style={{ maxWidth: "100%", maxHeight: "100%" }} src="https://cdn.tutsplus.com/net/uploads/2013/08/github-collab-retina-preview.gif" alt="github" />
          </div>
        </div>
        <div>
          <h3>This is a List</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </div>
        <div>
          <h3>Dunkirk</h3>
          <p>
            The Battle of Dunkirk (French: Bataille de Dunkerque) was fought in Dunkirk (Dunkerque), France, during the Second World War, between the Allies and Nazi Germany.
            As the Allies were losing the Battle of France on the Western Front, the Battle of Dunkirk was the defence and evacuation to Britain of British and other Allied forces in Europe from 26 May to 4 June 1940.
          </p>
          <p>
            After the Phoney War, the Battle of France began in earnest on 10 May 1940. To the east, the German Army Group B invaded the Netherlands and advanced westward. In response, the Supreme Allied Commander—French General Maurice Gamelin—initiated "Plan D" and entered Belgium to engage the Germans in the Netherlands. The plan relied heavily on the Maginot Line fortifications along the German–French border, but German forces had already crossed through most of the Netherlands before the French forces arrived.
            Gamelin instead committed the forces under his command, three mechanised armies, the French First and Seventh Armies and the British Expeditionary Force (BEF), to the River Dyle.
          </p>
        </div>
        <div style={{ margin: "1rem" }}>
          <h3>Table</h3>
          <table>
            <thead>
              <tr>
                <td>Column  1</td>
                <td>Column  2</td>
                <td>Column  3</td>
                <td>Column  4</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
                <td>Value 4</td>
              </tr>
              <tr>
                <td>Value 5</td>
                <td>Value 6</td>
                <td>Value 7</td>
                <td>Value 8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Chrono>
    </ComponentContainerTree>
  </Vertical>
);
export const VerticalCustomContent2: FunctionComponent<{
  type: string;
  cardHeight?: number;
}> = ({ type, cardHeight }) => (
  <Vertical>
    <ComponentContainerTree type={type}>
      <Chrono
        mode="VERTICAL"
        cardHeight={200}
        cardWidth={650}
        scrollable
        flipLayout
      >
        <div>
          <div style={{ width: "250px", height: "250px" }}>
            <img style={{ maxWidth: "100%", maxHeight: "100%" }} src="https://cdn.tutsplus.com/net/uploads/2013/08/github-collab-retina-preview.gif" alt="github" />
          </div>
        </div>
        <div>
          <h3>This is a List</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </div>
        <div>
          <h3>Dunkirk</h3>
          <p>
            The Battle of Dunkirk (French: Bataille de Dunkerque) was fought in Dunkirk (Dunkerque), France, during the Second World War, between the Allies and Nazi Germany.
            As the Allies were losing the Battle of France on the Western Front, the Battle of Dunkirk was the defence and evacuation to Britain of British and other Allied forces in Europe from 26 May to 4 June 1940.
          </p>
          <p>
            After the Phoney War, the Battle of France began in earnest on 10 May 1940. To the east, the German Army Group B invaded the Netherlands and advanced westward. In response, the Supreme Allied Commander—French General Maurice Gamelin—initiated "Plan D" and entered Belgium to engage the Germans in the Netherlands. The plan relied heavily on the Maginot Line fortifications along the German–French border, but German forces had already crossed through most of the Netherlands before the French forces arrived.
            Gamelin instead committed the forces under his command, three mechanised armies, the French First and Seventh Armies and the British Expeditionary Force (BEF), to the River Dyle.
          </p>
        </div>
        <div style={{ margin: "1rem" }}>
          <h3>Table</h3>
          <table>
            <thead>
              <tr>
                <td>Column  1</td>
                <td>Column  2</td>
                <td>Column  3</td>
                <td>Column  4</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
                <td>Value 4</td>
              </tr>
              <tr>
                <td>Value 5</td>
                <td>Value 6</td>
                <td>Value 7</td>
                <td>Value 8</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="chrono-icons">
          <img src="satellite-dish.svg" alt="github" />
          <img src="notification-bell.svg" alt="github" />
          <img src="camera.svg" alt="github" />
          <img src="rss.svg" alt="github" />
        </div>
      </Chrono>
    </ComponentContainerTree>
  </Vertical>
);