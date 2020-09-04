import { render, screen } from "@testing-library/react";
import React from "react";
import Content from "../timeline-item-content";

const fn = jest.fn();

test("Test Timeline Item Content", () => {
  const { getByText } = render(
    <Content content="This is a test" onShowMore={fn} />
  );
  const contentElement = getByText(/test/i);
  expect(contentElement).toBeInTheDocument();
});

test("Test Timeline Item Content Snapshot", () => {
  const { getByText } = render(
    <Content content="This is a test" onShowMore={fn} />
  );
  const contentElement = getByText(/test/i);
  expect(contentElement).toMatchSnapshot();
});

test("Test Timeline Item Content Snapshot", () => {
  render(<Content content="This is a test" active onShowMore={fn} />);
  const element = screen.getByText(/this is a test/i);
  expect(element.parentElement).toHaveClass("active");
});
