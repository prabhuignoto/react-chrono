import { render } from "@testing-library/react";
import React from "react";
import Title from "../index";

test("Check Timeline Item Title", () => {
  const { getByText } = render(<Title title="Test" />);
  const titleElement = getByText(/test/i);
  expect(titleElement).toBeInTheDocument();
});

test("Check Timeline Item Title Snapshot", () => {
  const { getByText } = render(<Title title="Test" active />);
  const titleElement = getByText(/test/i);
  expect(titleElement).toMatchSnapshot();
});

test("Check Timeline Active", () => {
  const { getByText } = render(<Title title="Test" active />);
  const titleElement = getByText(/test/i);
  expect(titleElement).toHaveClass("active");
  expect(titleElement).toHaveStyle(
    "background: #ffdf00;color: #0f52ba;font-weight: 600;"
  );
});
