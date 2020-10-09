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
          🚥
        </span>
        &nbsp;Render timelines in three different modes (Horizontal, Vertical,
        Tree).
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="tree">
          🌲
        </span>
        &nbsp;Use the <a href="#tree-mode">Tree mode</a> to layout the timeline
        cards vertically in a tree like fashion.
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="slideshow">
          📺
        </span>{" "}
        Auto play the timeline with <a href="#slideshow">slideshow</a> mode.
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="slideshow">
          🖼️
        </span>{" "}
        Display images in the timeline with ease.
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="keyboard support">
          ⌨
        </span>{" "}
        Navigate the timeline via Keyboard.
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="quick jump">
          🦘
        </span>{" "}
        Quick jump to the start or end of the timeline with HOME,END key.
      </Feature>
      <Feature>
        <span className="icon" role="img" aria-label="keyboard support">
          🔧
        </span>
        &nbsp;Optimized to render images efficiently on (tree & vertical mode).
        Images not visible are automatically hidden.
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
