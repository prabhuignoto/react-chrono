import React from "react";
import { hot } from "react-hot-loader/root";
import "./App.css";
import Timeline from "./components";
import { TimelineItemModel } from "./components/models/TimelineItemModel";

function App() {
  const items: TimelineItemModel[] = [
    {
      title: "1920",
      contentText: "Robert Goddard suggested sending rockets to the Moon.",
    },
    {
      title: "1959",
      contentText:
        "Soviet spacecraft Luna 2 reached the Moon, impacting near the crater Autolycus.",
    },
    {
      title: "1961",
      contentText: `U.S. Pres. John F. Kennedy proposed a crewed lunar program.`,
    },
    {
      title: "1964",
      contentText: `NASA’s Ranger 7 produced the first close-up pictures of the lunar surface.`,
    },
    {
      title: "1966",
      contentText: `Luna 9 showed the lunar surface was not too soft to support a spacecraft.`,
    },
    {
      title: "1967",
      contentText: `NASA’s Lunar Orbiter missions completed photographic mapping of the Moon.`,
    },
    {
      title: "1968",
      contentText: `NASA’s Apollo 8 made the first crewed flight to the Moon, circling it 10 times before returning to Earth.`,
    },
    {
      title: "1969",
      contentText: `Apollo 11 made the first landing on the Moon.`,
    },
  ];
  return (
    <div className="App">
      <Timeline
        items={items}
        titlePosition="TOP"
        itemWidth={250}
        mode="HORIZONTAL"
        slideShow
        disableNavOnScroll
      />
    </div>
  );
}

export default hot(App);
