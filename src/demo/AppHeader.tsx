import React from "react";
import AppLogo from "../assets/logo.png";
import { GithubLogo, Header, LogoImage } from "./App.styles";

export default ({ type }: { type: string }) => {

  return (
    <Header>
      <a href="https://react-chrono.vercel.app/">
        <LogoImage src={AppLogo} />
      </a>
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
            src={`https://ghbtns.com/github-btn.html?user=prabhuignoto&repo=react-chrono&type=star&count=true&size=large`}
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
};
