import React, { useCallback, useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import fontLoader from "webfontloader";
import AppLogo from "../assets/logo.png";
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
  GithubLogo,
  Header,
  Horizontal,
  LogoImage,
  URL,
  Vertical,
  Wrapper,
} from "./App.styles";
import data from "./data";
import Features from "./Features";
import useMediaQuery from "./mediaQueryEffect";

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
      ({ title, contentTitle, contentText, media }) => ({
        title,
        contentTitle,
        contentText,
      })
    );
    setItems(newItems);
  }, []);

  return (
    <Wrapper show={state.fontsLoaded} type={state.mediaType}>
      <>
        <Header>
          <LogoImage src={AppLogo} />
          <a
            href="http://github.com/prabhuignoto/react-chrono"
            target="_new"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GithubLogo>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=prabhuignoto&repo=react-chrono&type=star&count=true&size=large"
                frameBorder="0"
                scrolling="0"
                width="200"
                height="30"
                title="GitHub"
                style={{ position: "absolute" }}
              ></iframe>
            </GithubLogo>
          </a>
        </Header>
        <DescriptionContent>
          <strong>react-chrono</strong> is a modern timeline component built for
          React.
        </DescriptionContent>
        <Features />
        <br />
        <DescriptionContent>
          Lasting six years and one day, the Second World War started on 1
          September 1939. Here we trace the timeline of a conflict that engulfed
          the world.
        </DescriptionContent>
        <Horizontal>
          <Description>
            <span>
              <DescriptionHeader># Horizontal</DescriptionHeader>
            </span>
            <DescriptionContent>
              Timelines are rendered horizontally by default. The positioning of
              the cards can be customized to either top or bottom.
            </DescriptionContent>
          </Description>
          <ComponentContainer type={state.mediaType}>
            <Chrono items={data} mode="HORIZONTAL" slideShow/>
          </ComponentContainer>
        </Horizontal>
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
        <Vertical id="tree-mode">
          <Description>
            <span>
              <DescriptionHeader># Tree</DescriptionHeader>
            </span>
            <DescriptionContent>
              In <strong>TREE</strong> mode, the component will be rendered
              vertically, with cards alternating between left and right.
            </DescriptionContent>
          </Description>
          <ComponentContainerTree type={state.mediaType}>
            <Chrono items={items} mode="TREE" />
          </ComponentContainerTree>
        </Vertical>
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
              slideItemDuration={5000}
            />
          </ComponentContainer>
        </Horizontal>
        <Vertical>
          <Description>
            <span>
              <DescriptionHeader># Slideshow with Tree</DescriptionHeader>
            </span>
            <DescriptionContent>
              SlideShow is also supported for all 3 modes.
            </DescriptionContent>
          </Description>
          <ComponentContainerTree type={state.mediaType}>
            <Chrono items={data} mode="TREE" slideItemDuration={1500} slideShow />
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
