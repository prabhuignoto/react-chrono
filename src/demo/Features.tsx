import React from "react";
import { FeatureSet, Feature } from "./App.styles";

const Features: React.FunctionComponent = () => (
  <FeatureSet>
    <Feature>
      <span className="icon">🚥</span>&nbsp;Render timelines in three different
      modes (Horizontal, Vertical, Tree).
    </Feature>
    <Feature>
      <span className="icon">🌲</span>&nbsp;Use the{" "}
      <a href="#tree-mode">Tree mode</a> to layout the timeline cards vertically
      in a tree like fashion.
    </Feature>
    <Feature>
      <span className="icon">📺</span> Auto play the timeline with{" "}
      <a href="#slideshow">slideshow</a> mode.
    </Feature>
    <Feature>
      <span className="icon">⌨</span> Navigate the timeline via Keyboard.
    </Feature>
    <Feature>
      <span className="icon">🦘</span> Quick jump to start or end of the timeline with HOME,END key.
    </Feature>
    <Feature>
      <span className="icon">💪</span> Built with{" "}
      <a href="https://www.typescriptlang.org/" target="_new">
        Typescript
      </a>
    </Feature>
    <Feature>
      <span className="icon">🎨</span> Powered by{" "}
      <a href="https://styled-components.com/" target="_new">
        styled-components
      </a>
    </Feature>
  </FeatureSet>
);

export default Features;