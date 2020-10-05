import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import fontLoader from "webfontloader";
import CodeHorizontal from "../assets/code-horizontal.png";
import CodeTree from "../assets/code-tree.png";
import CodeVertical from "../assets/code-vertical.png";
import Slide1 from "../assets/slide-1.png";
import Slide2 from "../assets/slide-2.png";
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
  Pre,
  URL,
  Vertical,
  Wrapper,
} from "./App.styles";
import data from "./data";
import Features from "./Features";
import AppLogo from "../assets/logo.png";
import useMediaQuery from "./mediaQueryEffect";

const NewDemo: React.FunctionComponent = () => {
  const [state, setState] = useState({ fontsLoaded: false, mediaType: "" });

  const type = useMediaQuery();

  useEffect(() => {
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
  }, []);

  return (
    <Wrapper show={state.fontsLoaded}>
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
            <DescriptionHeader>#️⃣ Horizontal</DescriptionHeader>
            <DescriptionContent>
              Timelines are rendered horizontally by default. The positioning of the cards can be customized to either top or bottom.
            </DescriptionContent>
          </Description>
          <ComponentContainer type={state.mediaType}>
            <Chrono items={data} mode="HORIZONTAL" />
          </ComponentContainer>
        </Horizontal>
        <Vertical>
          <Description>
            <DescriptionHeader>#️⃣ Vertical</DescriptionHeader>
            <DescriptionContent>
              Use the <strong>VERTICAL</strong> mode to render the timelines vertically.
            </DescriptionContent>
          </Description>
          <ComponentContainerTree type={state.mediaType}>
            <Chrono items={data} mode="VERTICAL" />
          </ComponentContainerTree>
        </Vertical>
        <Vertical id="tree-mode">
          <Description>
            <DescriptionHeader>#️⃣ Tree</DescriptionHeader>
            <DescriptionContent>
              In <strong>TREE</strong> mode, the component will be rendered
              vertically, with cards alternating between left and right.
            </DescriptionContent>
          </Description>
          <ComponentContainerTree type={state.mediaType}>
            <Chrono items={data} mode="TREE" />
          </ComponentContainerTree>
        </Vertical>
        <Horizontal id="slideshow">
          <Description>
            <DescriptionHeader>#️⃣ Slideshow</DescriptionHeader>
            <DescriptionContent>
              In slideshow mode, the component autoplays the timeline for you.
              An optional <em>slideItemDuration</em> can be used to adjust the exact time
              duration to wait before displaying the next card.
            </DescriptionContent>
          </Description>
          <ComponentContainer type={state.mediaType}>
            <Chrono
              items={data}
              mode="HORIZONTAL"
              slideShow
              slideItemDuration={5000}
            />
          </ComponentContainer>
        </Horizontal>
        <Vertical>
          <Description>
            <DescriptionHeader>#️⃣ Slideshow</DescriptionHeader>
            <DescriptionContent>
              SlideShow is also supported for all 3 modes.
            </DescriptionContent>
          </Description>
          <ComponentContainerTree type={state.mediaType}>
            <Chrono
              items={data}
              mode="TREE"
              slideShow
              slideItemDuration={3500}
            />
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
