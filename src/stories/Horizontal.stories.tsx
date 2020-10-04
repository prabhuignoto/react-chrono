// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import Chrono from "../components/index";
import { TimelineProps } from "../models/TimelineModel";
import data from "./data";

export default {
  title: "Example/Timelines",
  component: Chrono,
} as Meta;

const Template: Story<TimelineProps & { height: string; width: string }> = (
  args
) => (
  <div
    style={{
      width: args.width,
      height: args.height,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
    }}
  >
    <Chrono {...args} />
  </div>
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  mode: "HORIZONTAL",
  items: data,
  height: "450px",
  width: "950px",
};

export const Vertical = Template.bind({});
Vertical.args = {
  mode: "VERTICAL",
  items: data,
  height: "650px",
  width: "950px",
};

export const Tree = Template.bind({});
Tree.args = {
  mode: "TREE",
  items: data,
  height: "650px",
  width: "950px",
};
