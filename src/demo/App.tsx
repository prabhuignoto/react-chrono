import React, { useEffect, useState } from 'react';
import { TimelineItemModel } from '../models/TimelineItemModel';
import {
  HorizontalBasic,
  VerticalBasic,
  VerticalTree,
  VerticalTreeMixed
} from './app-samples';
import './App.css';
import {
  Wrapper
} from './App.styles';
import data from './data';
import { BrowserRouter, Switch, Route } from "react-router-dom";

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
      <h3>Timeline of World War 2</h3>
      <BrowserRouter>
        <Switch>
          <Route path="/vertical-basic">
          {/* Vertical with no Media */}
          {items.length > 0 && (
              <VerticalBasic type={"big-screen"} items={items} />
            )}
          </Route>
          <Route path="/vertical-basic-mixed">
            {items.length > 0 && <VerticalTreeMixed type={"big-screen"} />} 
          </Route>
          <Route path="vertical-basic-images">

          </Route>
        </Switch>
      </BrowserRouter>
      <>
        {/* Horizontal with Media */}
        {/* {items.length > 0 && (
          <HorizontalBasic items={items} type="big-screen" />
        )} */}


        {/* Tree Mode */}
        {/* {items.length > 0 && <VerticalTree type={'big-screen'} items={items} />} */}

        {/* mixed mode */}

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
