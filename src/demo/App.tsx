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
  URL,
  Vertical,
  Wrapper,
} from "./App.styles";
import data from "./data";
import Features from "./Features";
import useMediaQuery from "./mediaQueryEffect";
import AppHeader from "./AppHeader";

const NewDemo: React.FunctionComponent = () => {
  const [state, setState] = useState({ fontsLoaded: false, mediaType: "" });
  const type = useMediaQuery();
  const [items, setItems] = useState<TimelineItemModel[]>();

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
  }, []);

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
        <Horizontal>
          <Description>
            <span>
              <DescriptionHeader># Horizontal</DescriptionHeader>
            </span>
            <DescriptionContent>
              Timelines are rendered horizontally by default. Use the control buttons or LEFT, RIGHT keys on your keyboard to navigate.
            </DescriptionContent>
          </Description>
          <ComponentContainer type={state.mediaType}>
            <Chrono items={data} mode="HORIZONTAL" titlePosition="TOP" />
          </ComponentContainer>
        </Horizontal>

        {/* Vertical with no Media */}
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
        </Vertical>

        {/* Tree Mode */}
        <Vertical id="tree-mode">
          <Description>
            <span>
              <DescriptionHeader># Tree</DescriptionHeader>
            </span>
            <DescriptionContent>
              In <strong>TREE</strong> mode, the cards are rendered vertically in an alternating fashion.
            </DescriptionContent>
          </Description>
          <ComponentContainerTree type={state.mediaType}>
            <Chrono items={items} mode="TREE" />
          </ComponentContainerTree>
        </Vertical>

        {/* Horizontal Slideshow */}
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
              slideItemDuration={3500}
            />
          </ComponentContainer>
        </Horizontal>


        {/* Tree Slideshow */}
        <Vertical>
          <Description>
            <span>
              <DescriptionHeader># Slideshow with Tree</DescriptionHeader>
            </span>
            <DescriptionContent>
              SlideShow is also supported in all the modes.
            </DescriptionContent>
          </Description>
          <ComponentContainerTree type={state.mediaType}>
            <Chrono items={data} mode="TREE" slideItemDuration={3500} slideShow />
          </ComponentContainerTree>
        </Vertical>
        <Footer>
          <URL href="https://www.prabhumurthy.com" target="_new">
            {new Date().getFullYear()}&copy;www.prabhumurthy.com
          </URL>
          <URL
            href="https://github.com/prabhuignoto/react-chrono"
            target="_new"
          >
            Github
          </URL>
        </Footer>
      </>
    </Wrapper>
  );
};

export default hot(NewDemo);
