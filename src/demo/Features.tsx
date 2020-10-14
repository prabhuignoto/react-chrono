import React from "react";
import { Feature, FeatureSet, FeatureSetHeader } from "./App.styles";

const Features: React.FunctionComponent = () => (
  <>
    <FeatureSetHeader>
      <span role="img" className="icon" aria-label="features">
        ✨
      </span>{" "}
      Features
    </FeatureSetHeader>
    <FeatureSet>
      <Feature>
        <span className="icon" role="img" aria-label="modes">
          💡
        </span>
        &nbsp;&nbsp;Render timelines in three different modes (
        <a href="#horizontal">Horizontal</a>,&nbsp;
        <a href="#vertical"> Vertical</a>,&nbsp; <a href="#tree"> Tree</a>).
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="tree">
          🌲
        </span>
        &nbsp;Use the <a href="#tree">Tree mode</a> to layout timeline cards
        vertically in a tree like fashion.
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="slideshow">
          📺
        </span>{" "}
        Auto play the timeline with <a href="#tree">slideshow</a> mode.
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="slideshow">
          🖼️
        </span>{" "}
        Display images & videos in the timeline with ease.
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="keyboard support">
          ⌨
        </span>{" "}
        Navigate the timeline via Keyboard.
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="keyboard support">
          ⚡
        </span>{" "}
        Data driven API
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="quick jump">
          🦘
        </span>{" "}
        Quick jump to the start or end of the timeline with HOME,END keys.
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="keyboard support">
          🔧
        </span>
        &nbsp; Optimized to only render timeline items that are visible in the containing element (vertical and tree modes).
      </Feature>
      {/* <Feature>
        <span className="icon" role="img" aria-label="typescript">
          💪
        </span>{" "}
        Built with{" "}
        <a href="https://www.typescriptlang.org/" target="_new">
          typescript
        </a>
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="styled-components">
          🎨
        </span>{" "}
        Powered by{" "}
        <a href="https://emotion.sh/docs/introduction" target="_new">
          emotion
        </a>
      </Feature> */}
    </FeatureSet>
  </>
);

export default Features;
