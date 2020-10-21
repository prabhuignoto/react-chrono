import React, { useEffect, useState } from 'react';
import Chrono from '../components';
import { TimelineItemModel } from '../models/TimelineItemModel';
import {
  HorizontalBasic,
  HorizontalSlideshow,
  VerticalBasic,
  VerticalTree,
  VerticalTreeMixed,
  VerticalTreeSlideshow,
} from './app-samples';
import './App.css';
import {
  ComponentContainer,
  Description,
  DescriptionContent,
  DescriptionHeader,
  Horizontal,
  Wrapper,
} from './App.styles';
import data from './data';

const NewDemo: React.FunctionComponent = () => {
  const [items, setItems] = useState<TimelineItemModel[]>([]);

  useEffect(() => {
    const newItems = data.map(
      ({ title, contentTitle, contentText, contentDetailedText, id }) => ({
        title,
        contentTitle,
        contentText,
        contentDetailedText,
        id,
      }),
    );
    setItems(newItems);
  }, []);

  return (
    <Wrapper>
      <>
        {/* Horizontal with Media */}
        {/* {items.length > 0 && (
          <HorizontalBasic items={items} type="big-screen" />
        )} */}

        {/* Vertical with no Media */}
        {/* {items.length > 0 && (
            <VerticalBasic type={"big-screen"} items={items} />
          )} */}

        {/* Tree Mode */}
        {items.length > 0 && <VerticalTree type={'big-screen'} items={items} />}

        {/* mixed mode */}
        {/* {items.length > 0 && <VerticalTreeMixed type={"big-screen"} />} */}

        {/* Horizontal Slideshow */}
        {/* {<HorizontalSlideshow type={"big-screen"} />} */}

        {/* Tree Slideshow */}
        {/* {items.length > 0 && (
          <VerticalTreeSlideshow
            type={'big-screen'}
            cardHeight={250}
          />
        )} */}
      </>
    </Wrapper>
  );
};

export default NewDemo;
