import React, { useCallback, useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import fontLoader from "webfontloader";
import { TimelineItemModel } from "../models/TimelineItemModel";
import { Chrono } from "../react-chrono";
import "./App.css";
import {
  ComponentContainer,
  ComponentContainerTree,
  Description,
  DescriptionContent,
  DescriptionHeader,
  Footer,
  Horizontal,
  SandBox,
  URL,
  Vertical,
  Wrapper,
} from "./App.styles";
import AppHeader from "./AppHeader";
import data from "./data";
import dataMixed from "./data-mixed";
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
        families: ["Roboto Mono:300,400,500"],
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
      setCardHeight(250);
    } else if (type === "big-screen") {
      setCardHeight(300);
    } else if (type === "tablet") {
      setCardHeight(300);
    } else {
      setCardHeight(200);
    }
  }, [type]);

  return (
    <Wrapper show={state.fontsLoaded} type={state.mediaType}>
      <>
        {/* header */}
        <AppHeader />

        {/* project description */}
        <DescriptionContent>
          <strong>react-chrono</strong> is a modern timeline component built for
          React.
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
              <Chrono items={data} mode="HORIZONTAL" cardHeight={cardHeight} />
            </ComponentContainer>
          </Horizontal>
        )}

        {/* Vertical with no Media */}
        {isPc && (
          <Vertical>
            <Description>
              <span>
                <DescriptionHeader># Vertical</DescriptionHeader>
              </span>
              <DescriptionContent>
                Use the <strong>VERTICAL</strong> mode to render the timelines
                vertically.
              </DescriptionContent>
            </Description>
            <ComponentContainerTree type={state.mediaType}>
              <Chrono items={items} mode="VERTICAL" />
            </ComponentContainerTree>
            <SandBox>
              <a href="https://codesandbox.io/s/react-chrono-tree-horizontal-wdqk3?fontsize=14&hidenavigation=1&theme=dark">
                <img
                  alt="Edit react-chrono-tree-horizontal"
                  src="https://codesandbox.io/static/img/play-codesandbox.svg"
                />
              </a>
            </SandBox>
          </Vertical>
        )}

        {/* Tree Mode */}
        {isPc && (
          <Vertical id="tree-mode">
            <Description>
              <span>
                <DescriptionHeader># Tree</DescriptionHeader>
              </span>
              <DescriptionContent>
                In <strong>TREE</strong> mode, the cards are rendered vertically
                in an alternating fashion.
              </DescriptionContent>
            </Description>
            <ComponentContainerTree type={state.mediaType}>
              <Chrono items={items} mode="TREE" />
            </ComponentContainerTree>
            <SandBox>
              <a href="https://codesandbox.io/s/react-chrono-tree-text-xtksq?fontsize=14&hidenavigation=1&theme=dark">
                <img
                  alt="Edit react-chrono-tree-text"
                  src="https://codesandbox.io/static/img/play-codesandbox.svg"
                />
              </a>
            </SandBox>
          </Vertical>
        )}

        {/* mixed mode */}
        <Vertical>
          <Description>
            <span>
              <DescriptionHeader># Mixed mode</DescriptionHeader>
            </span>
            <DescriptionContent>
              The rendering is data driven. This allows to mix both media and
              textual content.
            </DescriptionContent>
          </Description>
          <ComponentContainerTree type={state.mediaType}>
            <Chrono items={dataMixed} mode="TREE" cardHeight={cardHeight} />
          </ComponentContainerTree>
          <SandBox>
            <a href="https://codesandbox.io/s/react-chrono-tree-image-uh2nz?fontsize=14&hidenavigation=1&theme=dark">
              <img
                alt="Edit react-chrono-tree-image"
                src="https://codesandbox.io/static/img/play-codesandbox.svg"
              />
            </a>
          </SandBox>
        </Vertical>

        {/* Horizontal Slideshow */}
        {isPc && (
          <Horizontal id="slideshow">
            <Description>
              <span>
                <DescriptionHeader># Slideshow</DescriptionHeader>
              </span>
              <DescriptionContent>
                In slideshow mode, the component autoplays the timeline for you.
                An optional <em>slideItemDuration</em> can be used to adjust the
                exact time duration to wait before displaying the next card.
              </DescriptionContent>
            </Description>
            <ComponentContainer type={state.mediaType}>
              <Chrono
                items={items}
                mode="HORIZONTAL"
                slideShow
                slideItemDuration={4500}
                cardHeight={cardHeight}
              />
            </ComponentContainer>
            <SandBox>
              <a href="https://codesandbox.io/s/react-chrono-tree-text-slide-zytpi?fontsize=14&hidenavigation=1&theme=dark">
                <img
                  alt="Edit react-chrono-tree-text-slide"
                  src="https://codesandbox.io/static/img/play-codesandbox.svg"
                />
              </a>
            </SandBox>
          </Horizontal>
        )}

        {/* Tree Slideshow */}
        {isPc && (
          <Vertical>
            <Description>
              <span>
                <DescriptionHeader># Slideshow with Tree</DescriptionHeader>
              </span>
              <DescriptionContent>
                SlideShow is supported in all 3 modes.
              </DescriptionContent>
            </Description>
            <ComponentContainerTree type={state.mediaType}>
              <Chrono
                items={data}
                mode="TREE"
                slideItemDuration={2000}
                cardHeight={cardHeight}
              />
            </ComponentContainerTree>
            <SandBox>
              <a href="https://codesandbox.io/s/react-chrono-tree-demo-zksyo?fontsize=14&hidenavigation=1&theme=dark">
                <img
                  alt="Edit react-chrono-tree-demo"
                  src="https://codesandbox.io/static/img/play-codesandbox.svg"
                />
              </a>
            </SandBox>
          </Vertical>
        )}

        {/* footer */}
        <Footer>
          <URL href="https://www.prabhumurthy.com" target="_new">
            {new Date().getFullYear()}&copy;www.prabhumurthy.com
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
            TOP
          </URL>
        </Footer>
      </>
    </Wrapper>
  );
};

export default hot(NewDemo);
