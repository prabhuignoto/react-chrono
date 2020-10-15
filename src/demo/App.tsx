import React, { useEffect, useState } from "react";
import Chrono from "../components";
import { TimelineItemModel } from "../models/TimelineItemModel";
import { HorizontalSlideshow, VerticalBasic, VerticalTree, VerticalTreeMixed } from "./app-samples";
import "./App.css";
import { ComponentContainer, Description, DescriptionContent, DescriptionHeader, Horizontal, Wrapper } from "./App.styles";
import data from "./data";

const NewDemo: React.FunctionComponent = () => {
  const [items, setItems] = useState<TimelineItemModel[]>([]);

  useEffect(() => {
    const newItems = data.map(
      ({ title, contentTitle, contentText, contentDetailedText, id }) => ({
        title,
        contentTitle,
        contentText,
        contentDetailedText,
        id,
      })
    );
    setItems(newItems);
  }, []);

  return (
    <Wrapper>
      <>
        {/* Horizontal with Media */}
        {/* {items.length > 0 && (
          <Horizontal id="horizontal">
            <Description>
              <span>
                <DescriptionHeader># Horizontal</DescriptionHeader>
              </span>
              <DescriptionContent>
                Timelines are rendered horizontally by default. Use the control
                buttons or LEFT, RIGHT keys on your keyboard to navigate.
              </DescriptionContent>
            </Description>
            <ComponentContainer type={"big-screen"}>
              <Chrono
                items={items}
                mode="HORIZONTAL"
                cardHeight={300}
                slideShow
                slideItemDuration={750}
              />
            </ComponentContainer>
          </Horizontal>
        )} */}

        {/* Vertical with no Media */}
        {/* {items.length > 0 && (
          <VerticalBasic type={"big-screen"} items={items} />
        )} */}

        {/* Tree Mode */}
        {/* {items.length > 0 && <VerticalTree type={"big-screen"} items={items} />} */}

        {/* mixed mode */}
        {/* {items.length > 0 && <VerticalTreeMixed type={"big-screen"} />} */}

        {/* Horizontal Slideshow */}
        {<HorizontalSlideshow type={"big-screen"} />}

        {/* Tree Slideshow */}
        {/* {items.length > 0 && (
          <VerticalTreeSlideshow
            type={'big-screen'}
            cardHeight={cardHeight}
          />
        )} */}
      </>
    </Wrapper>
  );
};

export default NewDemo;
