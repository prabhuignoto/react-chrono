import React from "react";
import { Footer, URL } from "./App.styles";

export default () => (
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
        alt="github"
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
);