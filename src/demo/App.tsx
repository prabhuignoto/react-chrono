import React from "react";
import { hot } from "react-hot-loader/root";
import { Crono } from "../react-crono";
import "./App.css";
import {
  ComponentContainer,
  ComponentContainerTree,
  Description,
  DescriptionContent,
  DescriptionHeader,
  Footer,
  Github,
  Header,
  Horizontal,
  LogoImage,
  URL,
  Vertical,
  Wrapper,
  Pre,
} from "./App.styles";
import data from "./data";
import GithubLogo from "./github.svg";
import AppLogo from "./logo.png";

function App() {
  return (
    <Wrapper>
      <Header>
        <LogoImage src={AppLogo} />
        <a
          href="http://github.com/prabhuignoto/react-crono"
          target="_new"
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Github src={GithubLogo} />
        </a>
      </Header>
      <Horizontal>
        <Description>
          <DescriptionHeader>Horizontal</DescriptionHeader>
          <DescriptionContent>
            <strong>react-crono</strong> is a modern timeline component built for React. The
            component can be used to layout the events either <em>horizontally</em> or
            <em>vertically</em>. The time line can be easily navigated via the control
            buttons or keyboard. Below is the depiction of the events of World
            War 2 rendered in Horizontal mode.
          </DescriptionContent>
        </Description>
        <Pre>
          <code className="language-html">
            {'<Crono items={data} mode="HORIZONTAL" />'}
          </code>
        </Pre>
        <ComponentContainer>
          <Crono items={data} mode="HORIZONTAL" />
        </ComponentContainer>
      </Horizontal>
      <Horizontal>
        <Description>
          <DescriptionHeader>Slideshow</DescriptionHeader>
          <DescriptionContent>
            The component supports a slideShowMode using which you can auto play
            the timeline. An optional slideItemDuration can be used to adjust
            the exact time duration to wait before displaying the next card.
          </DescriptionContent>
        </Description>
        <Pre>
          <code className="language-html">
            {`<Crono items={data} mode="HORIZONTAL" slideShow slideItemDuration={5000} />`}
          </code>
        </Pre>
        <ComponentContainer>
          <Crono
            items={data}
            mode="HORIZONTAL"
            slideShow
            slideItemDuration={5000}
          />
        </ComponentContainer>
      </Horizontal>
      <Vertical>
        <Description>
          <DescriptionHeader>Tree</DescriptionHeader>
          <DescriptionContent>
            In <strong>TREE</strong> mode, the component will be rendered
            vertically, with cards alternating between left and right.{" "}
            <em>slideShow</em> option works for <strong>Tree</strong> as well.
          </DescriptionContent>
        </Description>
        <Pre>
          <code className="language-html">
            {'<Crono items={data} mode="TREE" />'}
          </code>
        </Pre>
        <ComponentContainerTree>
          <Crono items={data} mode="TREE" />
        </ComponentContainerTree>
      </Vertical>
      <Footer>
        <URL href="https://www.prabhumurthy.com" target="_new">
          www.prabhumurthy.com
        </URL>
      </Footer>
    </Wrapper>
  );
}

export default hot(App);
