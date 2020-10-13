import React, { useCallback, useEffect, useMemo, useState } from "react";
import { hot } from "react-hot-loader/root";
import fontLoader from "webfontloader";
import Chrono from "../components";
import { TimelineItemModel } from "../models/TimelineItemModel";
import Footer from "./app-footer";
import { VerticalBasic, VerticalTree, VerticalTreeMixed } from "./app-samples";
import "./App.css";
import {
  ComponentContainer,
  Description,
  DescriptionContent,
  DescriptionHeader,
  Horizontal,
  Wrapper,
} from "./App.styles";
import AppHeader from "./AppHeader";
import data from "./data";
import Features from "./Features";
import useMediaQuery from "./mediaQueryEffect";

const NewDemo: React.FunctionComponent = () => {
  const [state, setState] = useState({ fontsLoaded: false, mediaType: "" });
  const type = useMediaQuery();
  const [items, setItems] = useState<TimelineItemModel[]>([]);
  const [cardHeight, setCardHeight] = useState(250);

  const setFont = useCallback(() => {
    fontLoader.load({
      google: {
        families: ["Open Sans:300,400,500"],
      },
      active: () => {
        setState({
          fontsLoaded: true,
          mediaType: type,
        });
      },
    });
  }, [type]);

  useEffect(() => {
    setFont();
  }, [setFont]);

  useEffect(() => {
    const newItems = data.map(
      ({ title, contentTitle, contentText, contentDetailedText }) => ({
        title,
        contentTitle,
        contentText,
        contentDetailedText,
      })
    );
    setItems(newItems);
  }, []);

  useEffect(() => {
    if (type === "desktop") {
      setCardHeight(250);
    } else if (type === "big-screen") {
      setCardHeight(400);
    } else if (type === "tablet") {
      setCardHeight(260);
    } else {
      setCardHeight(200);
    }
  }, [type]);

  const isMobile = useMemo(() => {
    return state.mediaType !== "desktop" && state.mediaType !== "big-screen";
  }, [state.mediaType]);

  return (
    <Wrapper show={state.fontsLoaded} type={state.mediaType}>
      <>
        {/* header */}
        <AppHeader type={type} />

        {/* project description */}
        <DescriptionContent style={{ fontSize: "1.2rem" }}>
          <strong>react-chrono</strong> is a modern timeline component built for{" "}
          <a href="https://reactjs.org">React</a>.
        </DescriptionContent>

        {/* features */}
        <Features />
        <br />

        {/* demo description */}
        <DescriptionContent>
          Lasting six years and one day, the Second World War started on 1
          September 1939. Here we trace the timeline of a conflict that engulfed
          the world.
        </DescriptionContent>

        {/* Horizontal with Media */}
        {!isMobile && items.length > 0 && (
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
            <ComponentContainer type={state.mediaType}>
              <Chrono items={items} mode="HORIZONTAL" cardHeight={300} />
            </ComponentContainer>
          </Horizontal>
        )}

        {/* Vertical with no Media */}
        {items.length > 0 && (
          <VerticalBasic type={state.mediaType} items={items} />
        )}

        {/* Tree Mode */}
        {!isMobile && items.length > 0 && (
          <VerticalTree type={state.mediaType} items={items} />
        )}

        {/* mixed mode */}
        {!isMobile && items.length > 0 && (
          <VerticalTreeMixed type={state.mediaType} cardHeight={cardHeight} />
        )}

        {/* Horizontal Slideshow */}
        {/* {!isMobile && (
          <HorizontalSlideshow type={state.mediaType} cardHeight={cardHeight} />
        )} */}

        {/* Tree Slideshow */}
        {/* {!isMobile && items.length > 0 && (
          <VerticalTreeSlideshow
            type={state.mediaType}
            cardHeight={cardHeight}
          />
        )} */}

        {/* footer */}
        <Footer />
      </>
    </Wrapper>
  );
};

export default hot(NewDemo);
