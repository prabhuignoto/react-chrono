import React, { FunctionComponent } from 'react';
import Chrono from '../components';
import { TimelineItemModel } from '../models/TimelineItemModel';
import {
  ComponentContainer,
  ComponentContainerTree,
  Description,
  DescriptionContent,
  DescriptionHeader,
  Horizontal,
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
      <Description>
        <span>
          <DescriptionHeader># Horizontal</DescriptionHeader>
        </span>
        <DescriptionContent>
          Timelines are rendered horizontally by default. Use the control
          buttons or LEFT, RIGHT keys on your keyboard to navigate.
        </DescriptionContent>
      </Description>
      <ComponentContainer type={'big-screen'}>
        <Chrono
          items={dataMixed}
          mode="HORIZONTAL"
          cardHeight={200}
          slideShow
          slideItemDuration={2550}
          cardPositionHorizontal="BOTTOM"
          itemWidth={200}
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
    <Description>
      <span>
        <DescriptionHeader>
          <span># Vertical</span>
          {/* <SandBox>
            <a href="https://codesandbox.io/s/react-chrono-tree-horizontal-wdqk3?fontsize=14&hidenavigation=1&theme=dark">
              <img
                alt="Edit react-chrono-tree-horizontal"
                src="https://codesandbox.io/static/img/play-codesandbox.svg"
              />
            </a>
          </SandBox> */}
        </DescriptionHeader>
      </span>
      <DescriptionContent>
        Use the <strong>VERTICAL</strong> mode to render the timelines
        vertically.
      </DescriptionContent>
    </Description>
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="VERTICAL"
        slideShow
        slideItemDuration={2500}
        scrollable={{scrollbar:   false}}
        theme={{cardBgColor:  "#fff",  cardForeColor:  "blue"}}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalTree: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => {
  
  return <Vertical id="tree">
    <Description>
      <span>
        <DescriptionHeader>
          <span># Tree</span>
        </DescriptionHeader>
      </span>
      <DescriptionContent>
        In <strong>TREE</strong> mode, the cards are rendered vertically in an
        alternating fashion.
      </DescriptionContent>
    </Description>
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING"
        slideShow
        slideItemDuration={2350}
        scrollable={{scrollbar: false}}
        allowDynamicUpdate
        cardHeight={200}
        onScrollEnd={() => console.log('end reached')}
      >
        <div className="chrono-icons">
          <img src="https://img.icons8.com/ios-filled/100/000000/twitter.png" alt="twitter"/>
          <img src="https://img.icons8.com/ios-filled/100/000000/about.png" alt="twitter"/>
          <img src="https://img.icons8.com/ios-filled/100/000000/contacts.png" alt="twitter"/>
          <img src="https://img.icons8.com/ios-filled/100/000000/briefcase.png" alt="twitter"/>
          <img src="https://img.icons8.com/ios-filled/100/000000/idea.png" alt="twitter"/>
          <img src="https://img.icons8.com/ios-filled/100/000000/sun.png" alt="twitter"/>
          <img src="https://img.icons8.com/ios-filled/100/000000/info.png" alt="twitter"/>
          <img src="https://img.icons8.com/ios-filled/100/000000/calendar.png" alt="twitter"/>
          <img src="https://img.icons8.com/ios-filled/50/000000/mailbox-closed-flag-down.png" alt="mail-box" />
          <img src="https://img.icons8.com/ios-filled/50/000000/pinterest.png" alt="pinterest"/>
          <img src="https://img.icons8.com/ios-filled/100/000000/reddit.png" alt="reddit"/>
          <img src="https://img.icons8.com/ios-filled/100/000000/facebook.png" alt="reddit"/>
          <img src="https://img.icons8.com/ios-filled/100/000000/stumbleupon.png" alt="reddit"/>
        </div>
      </Chrono>
    </ComponentContainerTree>
  </Vertical>}
  ;

export const VerticalTreeMixed: FunctionComponent<{
  type: string;
  cardHeight?: number;
}> = ({ type, cardHeight }) => (
  <Vertical>
    <Description>
      <span>
        <DescriptionHeader>
          <span># Media</span>
          {/* <SandBox>
            <a href="https://codesandbox.io/s/react-chrono-tree-image-uh2nz?fontsize=14&hidenavigation=1&theme=dark">
              <img
                alt="Edit react-chrono-tree-image"
                src="https://codesandbox.io/static/img/play-codesandbox.svg"
              />
            </a>
          </SandBox> */}
        </DescriptionHeader>
      </span>
      <DescriptionContent>
        Render Images & Videos in the timeline with ease.
      </DescriptionContent>
    </Description>
    <ComponentContainerTree type={type}>
      <Chrono
        items={dataMixed}
        mode="VERTICAL_ALTERNATING"
        cardHeight={200}
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
    <Description>
      <span>
        <DescriptionHeader># Slideshow</DescriptionHeader>
      </span>
      <DescriptionContent>
        In slideshow mode, the component autoplays the timeline for you. An
        optional <em>slideItemDuration</em> can be used to adjust the exact time
        duration to wait before displaying the next card.
      </DescriptionContent>
    </Description>
    <ComponentContainer type={type}>
      <Chrono
        items={data}
        mode="HORIZONTAL"
        slideShow
        slideItemDuration={1500}
        cardHeight={450}
        scrollable
      />
      {/* <SandBox>
        <a href="https://codesandbox.io/s/react-chrono-tree-text-slide-zytpi?fontsize=14&hidenavigation=1&theme=dark">
          <img
            alt="Edit react-chrono-tree-text-slide"
            src="https://codesandbox.io/static/img/play-codesandbox.svg"
          />
        </a>
      </SandBox> */}
    </ComponentContainer>
  </Horizontal>
);


export const VerticalTreeSlideshow: FunctionComponent<{
  type: string;
  cardHeight: number;
}> = ({ type, cardHeight }) => (
  <Vertical>
    <Description>
      <span>
        <DescriptionHeader># Slideshow with Tree</DescriptionHeader>
      </span>
      <DescriptionContent>
        SlideShow is supported in all 3 modes.
      </DescriptionContent>
    </Description>
    <ComponentContainerTree type={type}>
      <Chrono
        items={data}
        mode="VERTICAL_ALTERNATING"
        cardHeight={200}
        scrollable
        // theme={{ primary: '#8675a9', secondary: '#ffd5cd' }}
      />
      {/* <SandBox>
        <a href="https://codesandbox.io/s/react-chrono-tree-demo-zksyo?fontsize=14&hidenavigation=1&theme=dark">
          <img
            alt="Edit react-chrono-tree-demo"
            src="https://codesandbox.io/static/img/play-codesandbox.svg"
          />
        </a>
      </SandBox> */}
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalCustomContent: FunctionComponent<{
  type: string;
  cardHeight?: number;
}> = ({ type, cardHeight }) => (
  <Vertical>
    <Description>
      <span>
        <DescriptionHeader># Slideshow with Tree</DescriptionHeader>
      </span>
      <DescriptionContent>
        SlideShow is supported in all 3 modes.
      </DescriptionContent>
    </Description>
    <ComponentContainerTree type={type}>
      <Chrono
        mode="VERTICAL" 
        cardHeight={200}
        scrollable
      >
        <div>
          <div style={{width: "250px", height: "250px"}}>
            <img style={{maxWidth:  "100%", maxHeight:  "100%"}}  src="https://cdn.tutsplus.com/net/uploads/2013/08/github-collab-retina-preview.gif"/>
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
        <div style={{margin: "1rem"}}>
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
    <Description>
      <span>
        <DescriptionHeader># Slideshow with Tree</DescriptionHeader>
      </span>
      <DescriptionContent>
        SlideShow is supported in all 3 modes.
      </DescriptionContent>
    </Description>
    <ComponentContainerTree type={type}>
      <Chrono
        mode="VERTICAL" 
        cardHeight={200}
        scrollable
        flipLayout
      >
        <div>
          <div style={{width: "250px", height: "250px"}}>
            <img style={{maxWidth:  "100%", maxHeight:  "100%"}}  src="https://cdn.tutsplus.com/net/uploads/2013/08/github-collab-retina-preview.gif"/>
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
        <div style={{margin: "1rem"}}>
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