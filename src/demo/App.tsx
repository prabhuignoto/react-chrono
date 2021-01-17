import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { TimelineItemModel } from '../models/TimelineItemModel';
import {
  HorizontalBasic,
  VerticalBasic,
  VerticalCustomContent,


  VerticalCustomContent2, VerticalTree,
  VerticalTreeMixed
} from './app-samples';
import './App.css';
import {
  ComponentLinks,
  Wrapper
} from './App.styles';
import data from './data';
import mixed from './data-mixed';

const NewDemo: React.FunctionComponent = () => {
  const [items, setItems] = useState<TimelineItemModel[]>([]);

  useEffect(() => {
    const newItems = data.map(
      ({ title, cardTitle, cardSubtitle, cardDetailedText, id }) => ({
        title,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
      }),
    );
    setItems(newItems);
  }, []);

  const [state, setState]  = useState(0);

  return (
    <Wrapper>
      <h3>Timeline of World War 2</h3>
      <BrowserRouter>
      <header>
        <ComponentLinks>
          <li>
            <Link to="/vertical-basic">Vertical Basic</Link>
          </li>
          <li>
            <Link to="/vertical-alternating">Vertical Alternating</Link>
          </li>
          <li>
            <Link to="/vertical-alternating-mixed">Vertical Alternating Mixed Data</Link>
          </li>
          <li>
            <Link to="/horizontal">Horizontal Basic</Link>
          </li>
          <li>
            <Link to="/vertical-custom">Vertical  Custom contents</Link>
          </li>
          <li>
            <Link to="/vertical-custom-icon">Vertical  Custom Icons</Link>
          </li>
        </ComponentLinks>
      </header>
      <section>
        <Switch>
          <Route path="/vertical-basic">
          {/* Vertical with no Media */}
          {items.length > 0 && (
              <VerticalBasic type={"big-screen"} items={items} />
            )}
          </Route>
          <Route path="/vertical-alternating-mixed">
            {items.length > 0 && <VerticalTreeMixed type={"big-screen"} />} 
          </Route>
          <Route path="/vertical-alternating">
            <button onClick={() => {
              setState(1 - state)
            }}>change</button>
            {<VerticalTree type={'big-screen'} items={state > 0 ? items : mixed} >{state}</VerticalTree>}
          </Route>
          <Route path="/horizontal">
            {items.length > 0 && (
              <HorizontalBasic items={items} type="big-screen" />
            )}
          </Route>
          <Route path="/vertical-custom">
              {items.length  > 0 && <VerticalCustomContent  type="big-screen" />}
          </Route>
          <Route path="/vertical-custom-icon">
              {items.length  > 0 && <VerticalCustomContent2  type="big-screen" />}
          </Route>
          <Route path="/">
            {items.length > 0 && (
                <VerticalBasic type={"big-screen"} items={items} />
              )}
          </Route>
        </Switch>
      </section>
      </BrowserRouter>
    </Wrapper>
  );
};

export default NewDemo;
