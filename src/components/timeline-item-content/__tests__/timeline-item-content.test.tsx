import { render, screen } from "@testing-library/react";
import React from "react";
import Content from "../timeline-item-content";

test("Test Timeline Item Content", () => {
  const { getByText } = render(<Content content="This is a test" />);
  const contentElement = getByText(/test/i);
  expect(contentElement).toBeInTheDocument();
});

test("Test Timeline Item Content Snapshot", () => {
  const { getByText } = render(<Content content="This is a test" />);
  const contentElement = getByText(/test/i);
  expect(contentElement).toMatchSnapshot();
});

test("Test Timeline Item Content Snapshot", () => {
  render(<Content content="This is a test" active />);
  const element = screen.getByText(/this is a test/i);
  expect(element.parentElement).toHaveClass("active");
  expect(element.parentElement).toHaveStyle("color: #0f52ba;");
});
