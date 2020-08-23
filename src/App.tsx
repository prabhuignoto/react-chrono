import React from "react";
import { hot } from "react-hot-loader/root";
import "./App.css";
import Timeline from "./components";
import { TimelineItemModel } from "./components/models/TimelineItemModel";

function App() {
  const items: TimelineItemModel[] = [
    {
      title: "1 September 1939",
      contentText: "German troops dismantle a Polish border post.",
      contentTitle: "The German invasion of Poland",
    },
    {
      title: "May 1940",
      contentTitle: "Dunkirk",
      contentText:
        "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
    },
    {
      title: "25 July 1940",
      contentTitle: "The Battle of Britain",
      contentText: `RAF Spitfire pilots scramble for their planes`,
    },
    {
      title: "June 1941",
      contentTitle: "Operation Barbarossa",
      contentText: `A column of Red Army prisoners taken during the first days of the German invasion`,
    },
    {
      title: "7 December 1941",
      contentTitle: "Pearl Harbor",
      contentText: `The destroyer USS Shaw explodes in dry dock after being hit by Japanese aircraft`,
    },
    {
      title: "15 February 1942",
      contentTitle: "The fall of Singapore",
      contentText: `Lieutenant General Arthur Percival and staff on their way to the Singapore Ford factory to negotiate the island’s surrender with General Yamashita`,
    },
    {
      title: "4 June 1942",
      contentTitle: "Midway",
      contentText: `The American aircraft carrier USS Yorktown under Japanese attack during the battle of Midway`,
    },
    {
      title: "25 October 1942",
      contentTitle: "Alamein",
      contentText: `German prisoners of war wait for transport after their capture at Alamein`,
    },
    {
      title: "February 1943",
      contentTitle: "Stalingrad",
      contentText: `Red Army soldiers hoist the Soviet flag over a recaptured Stalingrad factory following the German surrender`,
    },
    {
      title: "6 June 1944",
      contentTitle: "D-Day, Operation Overlord",
      contentText: `British commandos of the First Special Service Brigade land on Sword Beach`,
    },
    {
      title: "February 1945",
      contentTitle: "The Big Three",
      contentText: `Churchill, Roosevelt and Stalin sit for a group photograph during the Yalta conference`,
    },
    {
      title: "13/14 February 1945",
      contentTitle: "Dresden",
      contentText: `Dresden under incendiary bomb attack`,
    },
    {
      title: "17 April 1945",
      contentTitle: "Belsen",
      contentText: `Bodies of dead prisoners at the newly liberated Belsen concentration camp`,
    },
    {
      title: "8 May 1945",
      contentTitle: "VE Day",
      contentText: `millions of people rejoice in the news that Germany has surrendered – the war in Europe was finally over`,
    },
    {
      title: "9 August 1945",
      contentTitle: "Nagasaki",
      contentText: `Atomic bomb mushroom cloud over the Japanese city of Nagasaki`,
    },
  ];
  return (
    <div className="App">
      <Timeline
        items={items}
        titlePosition="TOP"
        itemWidth={250}
        mode="TREE"
      />
    </div>
  );
}

export default hot(App);
