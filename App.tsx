import React from "react";
import { hot } from "react-hot-loader/root";
import { Crono } from "../react-crono";
import "./App.css";
import {
  ComponentContainer,
  Footer,
  Github,
  Header,
  Horizontal,
  LogoImage,
  URL,
  Vertical,
  Wrapper,
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
        <pre>
          <code className="language-html">
            {'<Crono items={data} mode="HORIZONTAL" />'}
          </code>
        </pre>
        <ComponentContainer>
          <Crono items={data} mode="HORIZONTAL" />
        </ComponentContainer>
      </Horizontal>
      <Horizontal>
        <pre>
          <code className="language-html">
            {`<Crono items={data} mode="HORIZONTAL" slideShow slideItemDuration={5000} />`}
          </code>
        </pre>
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
        <pre>
          <code className="language-html">
            {'<Crono items={data} mode="TREE" />'}
          </code>
        </pre>
        <ComponentContainer>
          <Crono items={data} mode="TREE" />
        </ComponentContainer>
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
