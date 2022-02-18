import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Theme } from '../models/Theme';
import { TimelineItemModel } from '../models/TimelineItemModel';
import {
  HorizontalBasic, HorizontalInitalSelectedItem,
  VerticalBasic, VerticalBasicCardLess, VerticalCustomContent, VerticalCustomContent2, VerticalTree, VerticalTreeMixed
} from './app-samples';
import './App.css';
import {
  AppArea,
  ComponentLinks,
  Wrapper
} from './App.styles';
import data from './data';
import mixed from "./data-mixed";
import DynamicLoad from "./dynamic-load";

const NewDemo: React.FunctionComponent = () => {
  const [items, setItems] = useState<TimelineItemModel[]>([]);
  const [state, setState] = useState(0);

  const [customTheme, setCustomTheme] = useState<Theme>({
    cardBgColor: "#C0C0C0",
    primary: "#000",
    secondary: "#FFA500"
  });

  useEffect(() => {
    if (state > 0) {
      setCustomTheme({
        cardBgColor: "#efefef",
        primary: "#000",
        secondary: "#FFA500"
      })
    } else {
      setCustomTheme({
        cardBgColor: "#C0C0C0",
        primary: "#000",
        secondary: "#FFA500",
        titleColor: "#000"
      })
    }
  }, [state]);

  useEffect(() => {
    const newItems = data.map(
      ({ title, url, cardTitle, cardSubtitle, cardDetailedText, id, media }) => ({
        title,
        url,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
        media
      }),
    );
    setItems(newItems);
  }, []);


  return (
    <Wrapper>
      <BrowserRouter>
        <aside className="app-links">
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
              <Link to="/horizontal-initial-select">Horizontal Basic with initial selected item</Link>
            </li>
            <li>
              <Link to="/vertical-custom">Vertical  Custom contents</Link>
            </li>
            <li>
              <Link to="/vertical-custom-icon">Vertical  Custom Icons</Link>
            </li>
            <li>
              <Link to="/dynamic-load">Dynamic data load</Link>
            </li>
            <li>
              <Link to="/timeline-without-cards">Timeline Card less</Link>
            </li>
            <li>
              <Link to="/timeline-without-cards-horizontal">Timeline Card less (Horizontal)</Link>
            </li>
          </ComponentLinks>
        </aside>
        <AppArea>
          <Routes>
            <Route path="/vertical-basic" element={items.length && <VerticalBasic type={"big-screen"} items={items} />}>
            </Route>
            <Route path="/vertical-alternating-mixed" element={items.length > 0 && <VerticalTreeMixed type={"big-screen"} />} >

            </Route>
            <Route path="/vertical-alternating" element={<>
              <button onClick={() => {
                setState(1 - state);
              }}>change</button>
              {<VerticalTree type={'big-screen'} items={state > 0 ? items : mixed} theme={customTheme} >{state}</VerticalTree>}

            </>}>
            </Route>
            <Route path="/horizontal" element={items.length > 0 && (
              <HorizontalBasic items={items} type="big-screen" />
            )}>

            </Route>
            <Route path="/horizontal-initial-select" element={items.length > 0 && (
              <HorizontalInitalSelectedItem items={items} type="big-screen" />
            )}>
            </Route>
            <Route path="/vertical-custom" element={items.length > 0 && <VerticalCustomContent type="big-screen" />}>
            </Route>
            <Route path="/vertical-custom-icon" element={items.length > 0 && <VerticalCustomContent2 type="big-screen" />}>
            </Route>
            <Route path="/dynamic-load" element={items.length > 0 && <DynamicLoad />}>
            </Route>
            <Route path="/timeline-without-cards" element={items.length > 0 && <VerticalBasicCardLess type='big-screen' items={items} />}>
            </Route>
            <Route path="/timeline-without-cards-horizontal" element={items.length > 0 && <VerticalBasicCardLess type='big-screen' items={items} />}>
            </Route>
            <Route path="/" element={items.length > 0 && (
              <VerticalBasic type={"big-screen"} items={items} />
            )}>
            </Route>
          </Routes>
        </AppArea>
      </BrowserRouter>
    </Wrapper>
  );
};

export default NewDemo;
