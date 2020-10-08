import React from "react";
import { Header, LogoImage, GithubLogo } from "./App.styles";
import AppLogo from "../assets/logo.png";

export default () => (
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
          src="https://ghbtns.com/github-btn.html?user=prabhuignoto&repo=react-chrono&type=star&count=true&size=small"
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
);