import React, { FunctionComponent } from "react";
import Chrono from "../components";
import { TimelineItemModel } from "../models/TimelineItemModel";
import {
  ComponentContainer,
  ComponentContainerTree,
  Description,
  DescriptionContent,
  DescriptionHeader,
  Horizontal,
  Vertical,
} from "./App.styles";
import data from "./data";
import dataMixed from "./data-mixed";

export const VerticalBasic: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => (
  <Vertical id="vertical">
    <Description>
      <span>
        <DescriptionHeader>
          <span># Vertical</span>
          {/* <SandBox>
            <a href="https://codesandbox.io/s/react-chrono-tree-horizontal-wdqk3?fontsize=14&hidenavigation=1&theme=dark">
              <img
                alt="Edit react-chrono-tree-horizontal"
                src="https://codesandbox.io/static/img/play-codesandbox.svg"
              />
            </a>
          </SandBox> */}
        </DescriptionHeader>
      </span>
      <DescriptionContent>
        Use the <strong>VERTICAL</strong> mode to render the timelines
        vertically.
      </DescriptionContent>
    </Description>
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="VERTICAL"
        slideShow
        slideItemDuration={1500}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalTree: FunctionComponent<{
  type: string;
  items: TimelineItemModel[];
}> = ({ type, items }) => (
  <Vertical id="tree">
    <Description>
      <span>
        <DescriptionHeader>
          <span># Tree</span>
          {/* <SandBox>
            <a href="https://codesandbox.io/s/react-chrono-tree-text-xtksq?fontsize=14&hidenavigation=1&theme=dark">
              <img
                alt="Edit react-chrono-tree-text"
                src="https://codesandbox.io/static/img/play-codesandbox.svg"
              />
            </a>
          </SandBox> */}
        </DescriptionHeader>
      </span>
      <DescriptionContent>
        In <strong>TREE</strong> mode, the cards are rendered vertically in an
        alternating fashion.
      </DescriptionContent>
    </Description>
    <ComponentContainerTree type={type}>
      <Chrono
        items={items}
        mode="TREE"
        slideShow
        slideItemDuration={1350}
        theme={{ primary: "#8675a9", secondary: "#ffd5cd" }}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const VerticalTreeMixed: FunctionComponent<{
  type: string;
  cardHeight?: number;
}> = ({ type, cardHeight }) => (
  <Vertical>
    <Description>
      <span>
        <DescriptionHeader>
          <span># Media</span>
          {/* <SandBox>
            <a href="https://codesandbox.io/s/react-chrono-tree-image-uh2nz?fontsize=14&hidenavigation=1&theme=dark">
              <img
                alt="Edit react-chrono-tree-image"
                src="https://codesandbox.io/static/img/play-codesandbox.svg"
              />
            </a>
          </SandBox> */}
        </DescriptionHeader>
      </span>
      <DescriptionContent>
        Render Images & Videos in the timeline with ease.
      </DescriptionContent>
    </Description>
    <ComponentContainerTree type={type}>
      <Chrono
        items={dataMixed}
        mode="TREE"
        cardHeight={cardHeight}
        theme={{ primary: "#8675a9", secondary: "#ffd5cd" }}
      />
    </ComponentContainerTree>
  </Vertical>
);

export const HorizontalSlideshow: FunctionComponent<{
  type: string;
  cardHeight?: number;
}> = ({ type, cardHeight }) => (
  <Horizontal id="slideshow">
    <Description>
      <span>
        <DescriptionHeader># Slideshow</DescriptionHeader>
      </span>
      <DescriptionContent>
        In slideshow mode, the component autoplays the timeline for you. An
        optional <em>slideItemDuration</em> can be used to adjust the exact time
        duration to wait before displaying the next card.
      </DescriptionContent>
    </Description>
    <ComponentContainer type={type}>
      <Chrono
        items={data}
        mode="HORIZONTAL"
        slideItemDuration={1500}
        cardHeight={cardHeight}
      />
      {/* <SandBox>
        <a href="https://codesandbox.io/s/react-chrono-tree-text-slide-zytpi?fontsize=14&hidenavigation=1&theme=dark">
          <img
            alt="Edit react-chrono-tree-text-slide"
            src="https://codesandbox.io/static/img/play-codesandbox.svg"
          />
        </a>
      </SandBox> */}
    </ComponentContainer>
  </Horizontal>
);

export const VerticalTreeSlideshow: FunctionComponent<{
  type: string;
  cardHeight: number;
}> = ({ type, cardHeight }) => (
  <Vertical>
    <Description>
      <span>
        <DescriptionHeader># Slideshow with Tree</DescriptionHeader>
      </span>
      <DescriptionContent>
        SlideShow is supported in all 3 modes.
      </DescriptionContent>
    </Description>
    <ComponentContainerTree type={type}>
      <Chrono
        items={data}
        mode="TREE"
        cardHeight={cardHeight}
        theme={{ primary: "#8675a9", secondary: "#ffd5cd" }}
      />
      {/* <SandBox>
        <a href="https://codesandbox.io/s/react-chrono-tree-demo-zksyo?fontsize=14&hidenavigation=1&theme=dark">
          <img
            alt="Edit react-chrono-tree-demo"
            src="https://codesandbox.io/static/img/play-codesandbox.svg"
          />
        </a>
      </SandBox> */}
    </ComponentContainerTree>
  </Vertical>
);
