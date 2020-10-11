import React, { useCallback, useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import fontLoader from "webfontloader";
import { TimelineItemModel } from "../models/TimelineItemModel";
import { Chrono } from "../react-chrono";
import {
  HorizontalSlideshow,
  VerticalBasic,
  VerticalTree,
  VerticalTreeMixed,
  VerticalTreeSlideshow,
} from "./app-samples";
import "./App.css";
import {
  ComponentContainer,
  Description,
  DescriptionContent,
  DescriptionHeader,
  Footer,
  Horizontal,
  URL,
  Wrapper,
} from "./App.styles";
import AppHeader from "./AppHeader";
import data from "./data";
import Features from "./Features";
import useMediaQuery from "./mediaQueryEffect";

const NewDemo: React.FunctionComponent = () => {
  const [state, setState] = useState({ fontsLoaded: false, mediaType: "" });
  const type = useMediaQuery();
  const [items, setItems] = useState<TimelineItemModel[]>();
  const [isPc, setIsPc] = useState(false);
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
    setIsPc(type === "desktop" || type === "big-screen");
  }, []);

  useEffect(() => {
    if (type === "desktop") {
      setCardHeight(230);
    } else if (type === "big-screen") {
      setCardHeight(400);
    } else if (type === "tablet") {
      setCardHeight(260);
    } else {
      setCardHeight(200);
    }
  }, [type]);

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
        {isPc && (
          <Horizontal>
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
              <Chrono items={items} mode="HORIZONTAL" cardHeight={cardHeight} />
            </ComponentContainer>
          </Horizontal>
        )}

        {/* Vertical with no Media */}
        {isPc && <VerticalBasic type={state.mediaType} items={items} />}

        {/* Tree Mode */}
        {isPc && <VerticalTree type={state.mediaType} items={items} />}

        {/* mixed mode */}
        {isPc && (
          <VerticalTreeMixed type={state.mediaType} cardHeight={cardHeight} />
        )}

        {/* Horizontal Slideshow */}
        {isPc && (
          <HorizontalSlideshow type={state.mediaType} cardHeight={cardHeight} />
        )}

        {/* Tree Slideshow */}
        {isPc && (
          <VerticalTreeSlideshow
            type={state.mediaType}
            cardHeight={cardHeight}
          />
        )}

        {/* footer */}
        <Footer>
          <URL href="https://www.prabhumurthy.com" target="_new">
            {new Date().getFullYear()}&nbsp;&copy;www.prabhumurthy.com
          </URL>
          <URL
            href="https://github.com/prabhuignoto/react-chrono"
            target="_new"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="github.svg"
              style={{
                width: "1.25rem",
                height: "1.25rem",
                marginRight: "0.2rem",
              }}
            />
            <span>Github</span>
          </URL>
          <URL href="#" onClick={() => (document.body.scrollTop = 0)}>
            <span role="img" aria-label="go to top">
              ⏫
            </span>{" "}
            Back to Top
          </URL>
        </Footer>
      </>
    </Wrapper>
  );
};

export default hot(NewDemo);
