import { Theme } from '@models/Theme';
import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent, useState } from 'react';
import Chrono from '../components';
import { ComponentContainerTree, Vertical } from './App.styles';
import data from './data';
import dataMixed from './data-mixed';

export const VerticalTree: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
  theme: Theme;
  children: React.ReactNode | React.ReactNode[]
}> = ({ type, items, theme }) => {
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
          // textOverlay
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
              alt="twitter"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/contacts.png"
              alt="twitter"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/briefcase.png"
              alt="twitter"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/idea.png"
              alt="twitter"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/sun.png"
              alt="twitter"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/info.png"
              alt="twitter"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/calendar.png"
              alt="twitter"
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
              alt="reddit"
            />
            <img
              src="https://img.icons8.com/ios-filled/100/000000/stumbleupon.png"
              alt="reddit"
            />
          </div>
        </Chrono>
      </ComponentContainerTree>
    </Vertical>
  );
};

export const VerticalTreeMixed: FunctionComponent<{
  type: string;
  cardHeight?: number;
}> = ({ type, cardHeight }) => (
  <Vertical>
    <ComponentContainerTree type={type}>
      <Chrono
        items={dataMixed}
        mode="VERTICAL_ALTERNATING"
        cardHeight={400}
        cardWidth={450}
        scrollable
        slideShow
        slideItemDuration={2500}
        enableDarkToggle
        parseDetailsAsHTML
      />
    </ComponentContainerTree>
  </Vertical>
);

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
        cardWidth={650}
        slideItemDuration={2500}
        scrollable={{ scrollbar: false }}
        noUniqueId
        uniqueId="vertical_basic_test"
        parseDetailsAsHTML
        highlightCardsOnHover
        enableQuickJump={true}
        toolbarPosition='top'
        // textOverlay
        // borderLessCards
        // theme={{
        //   cardBgColor: '#fff',
        //   titleColorActive: '#6495ed',
        //   titleColor: '#922724',
        //   cardDetailsBackGround: '#e8e8e8',
        // }}
        onItemSelected={(selected) => console.log(selected.index)}
        fontSizes={{
          title: '1.5rem',
        }}
        theme={{
          cardDetailsColor: '#555555',
        }}
        // flipLayout
        focusActiveItemOnLoad
        activeItemIndex={2}
        // mediaHeight={150}
        // nestedCardHeight={100}
        cardHeight={200}
        contentDetailsHeight={10}
        timelinePointDimension={20}
        classNames={{
          cardText: 'custom-text',
        }}
        mediaSettings={{
          imageFit: 'cover',
        }}
        enableDarkToggle
        enableBreakPoint={true}
        responsiveBreakPoint={768}
        disableToolbar
      />
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalNewMedia: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => {
  return (
    <>
      <Vertical id="vertical">
        <ComponentContainerTree type={type}>
          <Chrono
            items={items}
            mode="VERTICAL_ALTERNATING"
            slideShow
            showAllCardsHorizontal
            cardWidth={450}
            slideItemDuration={2000}
            scrollable={{ scrollbar: false }}
            textOverlay
            parseDetailsAsHTML
            // slideShowType="reveal"
            // borderLessCards
            // theme={{
            //   cardBgColor: '#fff',
            //   titleColorActive: '#6495ed',
            //   titleColor: '#922724',
            //   cardDetailsBackGround: '#e8e8e8',
            //   cardDetailsColor: '#000',
            // }}
            // darkMode
            onItemSelected={(selected) => console.log(selected.index)}
            fontSizes={{
              title: '1.5rem',
            }}
            theme={{
              cardDetailsColor: '#2f4f4f',
            }}
            cardHeight={350}
            // timelinePointShape="diamond"
            focusActiveItemOnLoad
            activeItemIndex={9}
            // mediaHeight={200}
            // cardHeight={250}
            // cardHeight={350}
            enableDarkToggle
            contentDetailsHeight={200}
            timelinePointDimension={20}
            classNames={{
              cardText: 'custom-text',
            }}
            // mediaSettings={{
            //   imageFit: 'cover',
            // }}
          />
        </ComponentContainerTree>
      </Vertical>
    </>
  );
};
export const VerticalAlternatingNested: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => {
  return (
    <>
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
              imageFit: 'contain',
            }}
            highlightCardsOnHover
            parseDetailsAsHTML
            // borderLessCards
            // theme={{
            //   cardBgColor: '#fff',
            //   titleColorActive: '#6495ed',
            //   titleColor: '#922724',
            //   cardDetailsBackGround: '#e8e8e8',
            //   cardDetailsColor: '#000',
            // }}
            // darkMode
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
            // focusActiveItemOnLoad
            // activeItemIndex={9}
            // cardHeight={250}
            // cardHeight={350}
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
                alt="twitter"
              />
              <img
                src="https://img.icons8.com/ios-filled/100/000000/contacts.png"
                alt="twitter"
              />
              <img
                src="https://img.icons8.com/ios-filled/100/000000/briefcase.png"
                alt="twitter"
              />
              <img
                src="https://img.icons8.com/ios-filled/100/000000/idea.png"
                alt="twitter"
              />
              <img
                src="https://img.icons8.com/ios-filled/100/000000/sun.png"
                alt="twitter"
              />
              <img
                src="https://img.icons8.com/ios-filled/100/000000/info.png"
                alt="twitter"
              />
              <img
                src="https://img.icons8.com/ios-filled/100/000000/calendar.png"
                alt="twitter"
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
                alt="reddit"
              />
              <img
                src="https://img.icons8.com/ios-filled/100/000000/stumbleupon.png"
                alt="reddit"
              />
            </div>
          </Chrono>
        </ComponentContainerTree>
      </Vertical>
    </>
  );
};

export const VerticalBasicCardLess: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => (
  <Vertical id="vertical">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="VERTICAL"
        cardLess
        parseDetailsAsHTML
        theme={{
          cardBgColor: '#fff',
          titleColorActive: 'red',
        }}
        onItemSelected={(selected) => console.log(selected.index)}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalBasicNested: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => (
  <Vertical id="vertical">
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="HORIZONTAL"
        slideShow
        cardWidth={500}
        slideItemDuration={2500}
        scrollable={{ scrollbar: false }}
        // textOverlay
        // borderLessCards
        // theme={{
        //   cardBgColor: '#fff',
        //   titleColorActive: '#6495ed',
        //   titleColor: '#922724',
        //   cardDetailsBackGround: '#e8e8e8',
        // }}
        onItemSelected={(selected) => console.log(selected.index)}
        fontSizes={{
          title: '1rem',
        }}
        // flipLayout
        focusActiveItemOnLoad
        activeItemIndex={2}
        mediaHeight={200}
        nestedCardHeight={100}
        cardHeight={300}
        // contentDetailsHeight={300}
        timelinePointDimension={20}
        // timelinePointShape="diamond"
        classNames={{
          cardText: 'custom-text',
        }}
        parseDetailsAsHTML
        enableDarkToggle
        mediaSettings={{ align: 'center' }}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalCustomContent2: FunctionComponent<{
  type: string;
  cardHeight?: number;
  items?: TimelineItemModel[];
}> = ({ type, cardHeight, items }) => (
  <Vertical>
    <ComponentContainerTree type={type}>
      <Chrono
        mode="VERTICAL"
        cardHeight={200}
        cardWidth={650}
        scrollable
        flipLayout
        timelinePointDimension={30}
        items={items}
      >
        <div>
          <div style={{ width: '250px', height: '250px' }}>
            <img
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              src="https://cdn.tutsplus.com/net/uploads/2013/08/github-collab-retina-preview.gif"
              alt="github"
            />
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
            The Battle of Dunkirk (French: Bataille de Dunkerque) was fought in
            Dunkirk (Dunkerque), France, during the Second World War, between
            the Allies and Nazi Germany. As the Allies were losing the Battle of
            France on the Western Front, the Battle of Dunkirk was the defence
            and evacuation to Britain of British and other Allied forces in
            Europe from 26 May to 4 June 1940.
          </p>
          <p>
            After the Phoney War, the Battle of France began in earnest on 10
            May 1940. To the east, the German Army Group B invaded the
            Netherlands and advanced westward. In response, the Supreme Allied
            Commander—French General Maurice Gamelin—initiated "Plan D" and
            entered Belgium to engage the Germans in the Netherlands. The plan
            relied heavily on the Maginot Line fortifications along the
            German–French border, but German forces had already crossed through
            most of the Netherlands before the French forces arrived. Gamelin
            instead committed the forces under his command, three mechanised
            armies, the French First and Seventh Armies and the British
            Expeditionary Force (BEF), to the River Dyle.
          </p>
        </div>
        <div style={{ margin: '1rem' }}>
          <h3>Table</h3>
          <table>
            <thead>
              <tr>
                <td>Column 1</td>
                <td>Column 2</td>
                <td>Column 3</td>
                <td>Column 4</td>
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
        slideShow
        // theme={{ primary: '#8675a9', secondary: '#ffd5cd' }}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalCustomContent: FunctionComponent<{
  type: string;
  cardHeight?: number;
}> = ({ type, cardHeight }) => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter((prev) => prev + 1);
  const decrement = () => setCounter((prev) => prev - 1);

  return (
    <Vertical>
      <ComponentContainerTree type={type}>
        <Chrono mode="VERTICAL" cardHeight={200} cardWidth={650} scrollable>
          <div>
            <div style={{ width: '250px', height: '250px' }}>
              <img
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                src="https://cdn.tutsplus.com/net/uploads/2013/08/github-collab-retina-preview.gif"
                alt="github"
              />
            </div>
          </div>
          <div>
            <h3>This is a List</h3>
            {/* <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul> */}
            {counter}
            <button onClick={increment}>increment</button>
            <button onClick={decrement}>decrement</button>
          </div>
          <div>
            <h3>Dunkirk</h3>
            <p>
              The Battle of Dunkirk (French: Bataille de Dunkerque) was fought
              in Dunkirk (Dunkerque), France, during the Second World War,
              between the Allies and Nazi Germany. As the Allies were losing the
              Battle of France on the Western Front, the Battle of Dunkirk was
              the defence and evacuation to Britain of British and other Allied
              forces in Europe from 26 May to 4 June 1940.
            </p>
            <p>
              After the Phoney War, the Battle of France began in earnest on 10
              May 1940. To the east, the German Army Group B invaded the
              Netherlands and advanced westward. In response, the Supreme Allied
              Commander—French General Maurice Gamelin—initiated "Plan D" and
              entered Belgium to engage the Germans in the Netherlands. The plan
              relied heavily on the Maginot Line fortifications along the
              German–French border, but German forces had already crossed
              through most of the Netherlands before the French forces arrived.
              Gamelin instead committed the forces under his command, three
              mechanised armies, the French First and Seventh Armies and the
              British Expeditionary Force (BEF), to the River Dyle.
            </p>
          </div>
          <div style={{ margin: '1rem' }}>
            <h3>Table</h3>
            <table>
              <thead>
                <tr>
                  <td>Column 1</td>
                  <td>Column 2</td>
                  <td>Column 3</td>
                  <td>Column 4</td>
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
};
